import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { gameSessions } from '@/lib/db/schema'
import { randomBytes } from 'node:crypto'

const ONE_HOUR_MS = 3_600_000
export const SESSION_COOKIE = 'millionaire-quiz-session'

// Cookie value format: "{sessionId}:{currentStep}"
// The step is embedded so the proxy can enforce navigation without a DB call.

function encodeCookieValue(sessionId: string, step: number): string {
  return `${sessionId}:${step}`
}

export function decodeCookieValue(
  value: string,
): { sessionId: string; step: number } | null {
  const colonIdx = value.lastIndexOf(':')
  if (colonIdx === -1) return null
  const sessionId = value.slice(0, colonIdx)
  const step = Math.trunc(Number(value.slice(colonIdx + 1)))
  if (!sessionId || isNaN(step)) return null
  return { sessionId, step }
}

// ─── Cookie helpers ────────────────────────────────────────────────────────────

async function getSessionCookie(): Promise<string | undefined> {
  const store = await cookies()
  return store.get(SESSION_COOKIE)?.value
}

async function setSessionCookie(
  sessionId: string,
  step: number,
): Promise<void> {
  const store = await cookies()
  store.set(SESSION_COOKIE, encodeCookieValue(sessionId, step), {
    expires: Date.now() + ONE_HOUR_MS,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
}

async function deleteSessionCookie(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

// ─── Public API ────────────────────────────────────────────────────────────────

/** Creates a new game session in the DB and stores the id+step in a cookie. */
export async function createSession(): Promise<string> {
  const sessionId = randomBytes(32).toString('hex')
  await db.insert(gameSessions).values({ sessionId, currentStep: 1 })
  await setSessionCookie(sessionId, 1)
  return sessionId
}

/** Returns the current active DB session, or null if none / expired / finished. */
export async function getActiveSession() {
  const raw = await getSessionCookie()
  if (!raw) return null
  const decoded = decodeCookieValue(raw)
  if (!decoded) return null

  const [session] = await db
    .select()
    .from(gameSessions)
    .where(eq(gameSessions.sessionId, decoded.sessionId))
    .limit(1)

  if (!session || session.status !== 'active') return null
  return session
}

/** Advances the session to the next step. */
export async function advanceSession(
  sessionId: string,
  nextStep: number,
): Promise<void> {
  await db
    .update(gameSessions)
    .set({ currentStep: nextStep, updatedAt: new Date() })
    .where(eq(gameSessions.sessionId, sessionId))
  await setSessionCookie(sessionId, nextStep)
}

/** Marks the session as won or lost and clears the cookie. */
export async function endSession(
  sessionId: string,
  outcome: 'won' | 'lost',
): Promise<void> {
  await db
    .update(gameSessions)
    .set({ status: outcome, updatedAt: new Date() })
    .where(eq(gameSessions.sessionId, sessionId))
  await deleteSessionCookie()
}

/** Clears the cookie without touching the DB (used for error / bad-state resets). */
export async function clearSessionCookie(): Promise<void> {
  await deleteSessionCookie()
}
