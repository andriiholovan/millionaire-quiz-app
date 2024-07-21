# Millionaire game quiz. [[live_application]](https://millionaire-app-quiz.vercel.app/) ![Test workflow](https://github.com/andriiholovan/millionaire-quiz-app/actions/workflows/test.yml/badge.svg)
[![Main screen of the application](main_screen.png)](https://millionaire-app-quiz.vercel.app/)

## Description

Project is a quiz application based on **Next.js**, the React Framework for the Web.
It's responsive from **320px** to **4K** displays.
Added custom [not-found](https://millionaire-app-quiz.vercel.app/non-existent-url) and [error-boundary](https://millionaire-app-quiz.vercel.app/kill-app?force) pages. Also, present pre-commit/pre-push hooks.

### Roadmap
- [WIP] Authorization to save user's progress in PostgresDB.
- Storing quiz question's list in separate table.
- Protected admin page to add/update/delete quiz questions.
- Public API to remotely revalidate app cache by PostgresDB hook (on quiz questions table data change).
- Gemini llm integration to make hints feature for user (like 50/50 hint, emulation of the "call to your friend" hint, etc.)   

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Quiz data is loading dynamically from the API https://npoint.io.
That remote json resource has data validation and could be easily extendable.
Feel free to pass the url into `process.env.QUIZ_DATA_URL` variable to use your own json resource.

BTW, you can find my data + schema example here https://www.npoint.io/docs/b7bd9c92c028169450f0 .

```bash
QUIZ_DATA_URL=https://[your_api_resource_is_here] npm run dev
```

## Tests

```bash
npm run test
```

## Subscribe to the repository to get any updates. Use the repository Issues/PRs to reach me for any feature requests.
