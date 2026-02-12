const API_KEY = 'AIzaSyBuSOQqqkbfz_-zFRiS-R5iJHrlhn0BSe4';

async function listModels() {
  console.log('🔍 Fetching available Gemini models...\n');

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );

    if (!response.ok) {
      console.error(`❌ HTTP Error: ${response.status} ${response.statusText}`);
      const error = await response.text();
      console.error('Error details:', error);
      return;
    }

    const data = await response.json();

    if (data.models && data.models.length > 0) {
      console.log(`✅ Found ${data.models.length} available models:\n`);

      for (const model of data.models) {
        console.log(`📌 ${model.name}`);
        console.log(`   Display Name: ${model.displayName || 'N/A'}`);
        console.log(`   Description: ${model.description || 'N/A'}`);
        console.log(`   Supported Methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}\n`);
      }

      // Find models that support generateContent
      const contentModels = data.models.filter((m: any) =>
        m.supportedGenerationMethods?.includes('generateContent')
      );

      if (contentModels.length > 0) {
        console.log('\n💡 Models that support generateContent:');
        contentModels.forEach((m: any) => {
          // Extract the model ID from the full name (e.g., "models/gemini-pro" -> "gemini-pro")
          const modelId = m.name.replace('models/', '');
          console.log(`   - ${modelId}`);
        });
      }
    } else {
      console.log('⚠️  No models found or empty response');
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
  }
}

listModels();
