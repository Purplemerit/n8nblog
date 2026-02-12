import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || 'gemini-1.5-flash'
});

export interface RSSArticleInput {
  title: string;
  content: string;
  description?: string;
  category?: string;
}

export interface BlogArticleOutput {
  title: string;
  content: string;
  excerpt: string;
}

// Helper function for exponential backoff delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Rephrase a news article into an engaging blog post using Gemini AI
 * @param article - The original RSS article
 * @param retries - Number of retry attempts (default: 3)
 * @returns Rephrased blog article with title, content, and excerpt
 */
export async function rephraseArticle(
  article: RSSArticleInput,
  retries: number = 3
): Promise<BlogArticleOutput> {
  const prompt = `You are a professional blog content writer. Transform the following news article into a comprehensive, engaging blog post while maintaining complete factual accuracy.

**CRITICAL RULES:**
1. Maintain ALL factual information from the source - do not add, remove, or change any facts
2. EXPAND the content to 2-3 times the original length by adding context, explanations, and details
3. Use a conversational, engaging blog writing style (not news reporting style)
4. Create a proper blog structure: introduction paragraph, detailed body sections, conclusion
5. Break content into well-structured paragraphs (3-5 sentences each)
6. Preserve all names, dates, numbers, and quoted material exactly
7. Add transitional phrases between paragraphs for better flow
8. Expand on key points with more context and explanation
9. Do NOT add fictional information - only expand on facts already present

**Original Article:**
Title: ${article.title}
Content: ${article.content || article.description || ''}
Category: ${article.category || 'News'}

**Instructions:**
1. Create an engaging, catchy blog post title (keep original meaning but make it more compelling)
2. Write a strong introduction paragraph that hooks the reader
3. Expand the main content into detailed, well-structured body paragraphs (aim for 2-3x the original length)
4. Add a brief conclusion that summarizes the key takeaways
5. Use conversational language and engaging transitions
6. Create a compelling 2-3 sentence excerpt that entices readers

**Blog Post Structure:**
- Introduction: Set the scene and introduce the topic engagingly
- Body: Expand each key point into its own detailed paragraph with context and explanation
- Conclusion: Brief wrap-up of main points and their significance
- Use paragraph breaks for readability

**Response Format:**
Return ONLY a valid JSON object with this exact structure:
{
  "title": "your compelling blog post title here",
  "content": "your expanded blog content here with proper paragraph structure (use \\n\\n for paragraph breaks)",
  "excerpt": "your 2-3 sentence compelling summary here"
}

Do not include any markdown formatting, code blocks, or additional text. Only return the raw JSON object.`;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Generate content with Gemini
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8, // Higher creativity for engaging blog writing
          maxOutputTokens: 4096, // Allow longer blog posts
          topP: 0.95,
        },
      });

      const response = result.response;
      const text = response.text();

      // Parse JSON response
      let parsedResponse: BlogArticleOutput;

      try {
        // Try to extract JSON from the response (in case it's wrapped in markdown)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResponse = JSON.parse(jsonMatch[0]);
        } else {
          parsedResponse = JSON.parse(text);
        }
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', text);
        throw new Error('Invalid JSON response from Gemini API');
      }

      // Validate response structure
      if (!parsedResponse.title || !parsedResponse.content || !parsedResponse.excerpt) {
        throw new Error('Incomplete response from Gemini API');
      }

      // Return successful rephrased article
      return {
        title: parsedResponse.title.trim(),
        content: parsedResponse.content.trim(),
        excerpt: parsedResponse.excerpt.trim(),
      };

    } catch (error: any) {
      const isLastAttempt = attempt === retries - 1;

      // Check if it's a rate limit error
      if (error?.status === 429 || error?.message?.includes('quota')) {
        if (!isLastAttempt) {
          // Exponential backoff: 2^attempt seconds
          const delayMs = Math.pow(2, attempt) * 1000;
          console.log(`Rate limit hit. Retrying in ${delayMs}ms... (Attempt ${attempt + 1}/${retries})`);
          await delay(delayMs);
          continue;
        }
      }

      // If it's the last attempt or a non-retryable error, throw or fallback
      if (isLastAttempt) {
        console.error('Gemini AI rephrasing failed after all retries:', error);

        // Fallback: Return the original content with minimal formatting
        return {
          title: article.title,
          content: article.content || article.description || '',
          excerpt: article.description?.substring(0, 200) + '...' || article.title,
        };
      }

      // For other errors, retry with exponential backoff
      const delayMs = Math.pow(2, attempt) * 1000;
      console.log(`Error occurred. Retrying in ${delayMs}ms... (Attempt ${attempt + 1}/${retries})`);
      await delay(delayMs);
    }
  }

  // Fallback (should not reach here, but just in case)
  return {
    title: article.title,
    content: article.content || article.description || '',
    excerpt: article.description?.substring(0, 200) + '...' || article.title,
  };
}

/**
 * Rephrase multiple articles in batches to respect rate limits
 * @param articles - Array of RSS articles to rephrase
 * @param batchSize - Number of articles to process concurrently (default: 5)
 * @returns Array of rephrased blog articles
 */
export async function rephraseArticlesBatch(
  articles: RSSArticleInput[],
  batchSize: number = 5
): Promise<BlogArticleOutput[]> {
  const results: BlogArticleOutput[] = [];

  // Process in batches
  for (let i = 0; i < articles.length; i += batchSize) {
    const batch = articles.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(articles.length / batchSize)} (${batch.length} articles)`);

    // Process batch in parallel
    const batchResults = await Promise.all(
      batch.map(article => rephraseArticle(article))
    );

    results.push(...batchResults);

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < articles.length) {
      await delay(1000); // 1 second delay between batches
    }
  }

  return results;
}

/**
 * Classify article content into the correct category using AI
 * @param article - The article to classify
 * @returns The most appropriate category slug
 */
export async function classifyArticleCategory(
  article: { title: string; content: string; description?: string }
): Promise<string> {
  const prompt = `Analyze the following article and determine which category it belongs to.

**Article:**
Title: ${article.title}
Content: ${article.content || article.description || ''}

**Available Categories:**
1. sports - Sports news, athletes, games, tournaments, scores, teams
2. business - Business news, economy, finance, markets, companies, startups
3. technology - Tech news, gadgets, software, AI, apps, innovations
4. entertainment - Movies, TV shows, celebrities, music, awards, films, actors, entertainment industry
5. politics - Political news, government, elections, policies, politicians
6. health - Health news, medical, wellness, diseases, treatments
7. world - International news, global events, foreign affairs
8. news - General news that doesn't fit other categories

**Instructions:**
- If the article is about movies, TV shows, celebrities, actors, films, entertainment awards, or the entertainment industry, classify it as "entertainment"
- If it's about sports events, athletes, or games, classify it as "sports"
- If it's about business, economy, or companies, classify it as "business"
- If it's about technology, gadgets, or software, classify it as "technology"
- If it's about politics, government, or elections, classify it as "politics"
- If it's about health, medical topics, or wellness, classify it as "health"
- If it's about international or world events, classify it as "world"
- Only use "news" if it doesn't clearly fit any other category

**Response Format:**
Return ONLY the category slug (one word): sports, business, technology, entertainment, politics, health, world, or news`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3, // Lower temperature for more consistent classification
        maxOutputTokens: 50,
      },
    });

    const response = result.response.text().trim().toLowerCase();

    // Validate the response is one of the valid categories
    const validCategories = ['sports', 'business', 'technology', 'entertainment', 'politics', 'health', 'world', 'news'];
    const category = validCategories.find(cat => response.includes(cat));

    return category || 'news'; // Default to 'news' if classification fails
  } catch (error) {
    console.error('Error classifying article category:', error);
    return 'news'; // Default fallback
  }
}

/**
 * Validate that the rephrased content maintains factual accuracy
 * This is a basic validation - for production, you might want more sophisticated checks
 */
export function validateRephrasing(original: RSSArticleInput, rephrased: BlogArticleOutput): boolean {
  // Basic validation checks
  const checks = {
    hasContent: rephrased.content.length > 50,
    hasTitle: rephrased.title.length > 5,
    hasExcerpt: rephrased.excerpt.length > 20,
    notTooShort: rephrased.content.length > original.content.length * 0.5,
    notTooLong: rephrased.content.length < original.content.length * 4, // Allow up to 4x expansion for detailed blog posts
  };

  const allChecksPassed = Object.values(checks).every(check => check);

  if (!allChecksPassed) {
    console.warn('Rephrasing validation failed:', {
      original: original.title,
      rephrased: rephrased.title,
      checks,
    });
  }

  return allChecksPassed;
}
