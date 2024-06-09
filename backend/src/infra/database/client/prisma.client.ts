import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";

@injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
    this.$disconnect()
      .then(() => {
        console.log("Disconnected from database");
      })
      .catch((e) => {
        console.error("Error disconnecting from database", e);
      });
  }

  async disconnect(): Promise<void> {
    await this.$disconnect();
  }
}

export const prismaService = new PrismaService();
