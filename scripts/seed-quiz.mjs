/**
 * One-time seed: fetches quiz data from the external API and inserts it into
 * Neon. Safe to re-run — skips if quiz_questions already has rows.
 *
 * Usage:
 *   node --env-file-if-exists=/vercel/share/.env.project scripts/seed-quiz.mjs
 */
import pg from 'pg'

const { QUIZ_DATA_URL = 'https://api.npoint.io/b7bd9c92c028169450f0' } =
  process.env

const client = new pg.Client({ connectionString: process.env.DATABASE_URL })

await client.connect()

try {
  const { rows: existing } = await client.query(
    'SELECT 1 FROM quiz_questions LIMIT 1',
  )
  if (existing.length > 0) {
    console.log('Quiz data already seeded — skipping.')
  } else {
    console.log(`Fetching quiz data from ${QUIZ_DATA_URL} …`)
    const res = await fetch(QUIZ_DATA_URL)
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()

    await Promise.all(
      data.map(async (item) => {
        const { rows } = await client.query(
          `INSERT INTO quiz_questions (step, question, reward)
           VALUES ($1, $2, $3)
           RETURNING id`,
          [item.step, item.question, item.reward],
        )
        const questionId = rows[0].id

        await Promise.all(
          item.answers.map((answer) =>
            client.query(
              `INSERT INTO quiz_answers (question_id, answer_id, title, is_correct)
               VALUES ($1, $2, $3, $4)`,
              [questionId, answer.id, answer.title, answer.isCorrect],
            ),
          ),
        )
        console.log(
          `  Inserted step ${item.step}: ${item.question.slice(0, 50)}…`,
        )
      }),
    )

    console.log('Seed complete.')
  }
} finally {
  await client.end()
}
