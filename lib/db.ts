import { PrismaClient } from "@prisma/client";

function createPrismaClient(): PrismaClient {
  if(!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient();
  }
  return globalThis.prismaClient;
}

export const db = createPrismaClient();
export { type Comment, type User } from "@prisma/client";


