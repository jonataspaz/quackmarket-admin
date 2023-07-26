import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;

/*Ensure that when hot reloading is performed with Next.js 13, 
it doesn't initialize a new PrismaClient each time.*/
