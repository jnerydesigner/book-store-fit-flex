import { PrismaClient } from "@prisma/client";
import { BookSeed } from "./author.seed";

const prisma = new PrismaClient();

async function main() {
  await BookSeed();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
