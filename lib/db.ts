import { PrismaClient } from '../generated/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}
// @ts-ignore
export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db