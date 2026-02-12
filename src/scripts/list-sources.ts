import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sources = await prisma.newsSource.findMany();
  console.log(JSON.stringify(sources, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
