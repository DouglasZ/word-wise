import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

// Isso é necessário evitar que o hot-reloading fique abrindo várias conexões com o banco de dados
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
