import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

// ─── Quiz content ─────────────────────────────────────────────────────────────

export const quizQuestions = pgTable('quiz_questions', {
  id: serial('id').primaryKey(),
  step: integer('step').notNull().unique(),
  question: text('question').notNull(),
  reward: varchar('reward', { length: 20 }).notNull(),
})

export const quizAnswers = pgTable('quiz_answers', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').notNull(),
  answerId: varchar('answer_id', { length: 10 }).notNull(),
  title: varchar('title', { length: 50 }).notNull(),
  isCorrect: boolean('is_correct').notNull().default(false),
})

// ─── Game sessions ────────────────────────────────────────────────────────────

export const sessionStatusEnum = pgEnum('session_status', [
  'active',
  'won',
  'lost',
])

export const gameSessions = pgTable('game_sessions', {
  id: serial('id').primaryKey(),
  sessionId: varchar('session_id', { length: 64 }).notNull().unique(),
  currentStep: integer('current_step').notNull().default(1),
  status: sessionStatusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type QuizQuestion = typeof quizQuestions.$inferSelect
export type QuizAnswer = typeof quizAnswers.$inferSelect
export type GameSession = typeof gameSessions.$inferSelect
