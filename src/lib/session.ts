import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import prisma from "./db";

export async function generateSessionToken() {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userId: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });
  return session;
}

export async function validateSession(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const findSession = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      user: true,
    },
  });
  if (!findSession) return { session: null, user: null };
  if (Date.now() >= findSession.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }
  if (
    Date.now() >=
    findSession.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
  ) {
    findSession.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await prisma.session.update({
      where: {
        id: findSession.id,
      },
      data: {
        expiresAt: findSession.expiresAt,
      },
    });
  }
  return {
    session: {
      id: findSession.id,
      userId: findSession.userId,
      expiresAt: findSession.expiresAt,
    },
    user: findSession.user,
  };
}

export async function invalidateSessions(sessionId: string) {
  await prisma.session.deleteMany({ where: { id: sessionId } });
}
