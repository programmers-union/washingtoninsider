import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (!global.prisma) {
  console.log('Creating new PrismaClient instance');
} else {
  console.log('Reusing existing PrismaClient instance');
}

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;

