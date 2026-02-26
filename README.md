# Millionaire Game Quiz [[live_application]](https://millionaire-app-quiz.vercel.app/) ![Test workflow](https://github.com/andriiholovan/millionaire-quiz-app/actions/workflows/test.yml/badge.svg)

[![Main screen of the application](main_screen.png)](https://millionaire-app-quiz.vercel.app/)

## Description

This project is a quiz application based on [Next.js](https://nextjs.org/).
Styling: CSS Modules.
The app is responsive from **320px** to **4K** displays.
The application includes custom [not-found](https://millionaire-app-quiz.vercel.app/non-existent-url) and [error-boundary](https://millionaire-app-quiz.vercel.app/kill-app?force) pages.
Also, pre-commit,~~pre-push~~ hooks are present (pre-push moved to [`test.yml`](https://github.com/andriiholovan/millionaire-quiz-app/blob/main/.github/workflows/test.yml) GitHub CI workflow).

## Roadmap

- [x] Add @vercel/speed-insights and optimize app Core Web Vitals.
- [x] Add @vercel/toolbar and optimize app accessibility.
- [ ] [WIP] Authorization to save user's progress in PostgresDB.
- [ ] Storing quiz questions list in separate table.
- [ ] Protected admin page to add/update/delete quiz questions.
- [ ] Public API to remotely revalidate app cache by PostgresDB hook (on quiz questions table data change).
- [ ] Gemini LLM integration to implement hints feature for the user (like 50/50 hint, emulation of the "call to your friend" hint, etc.)

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

Quiz data is loaded dynamically from the API at https://npoint.io.
The remote JSON resource has data validation and can be easily extended.
Feel free to pass the URL into `process.env.QUIZ_DATA_URL` variable to use your own JSON resource.

By the way, you can find my data + schema example here: https://www.npoint.io/docs/b7bd9c92c028169450f0.

```bash
QUIZ_DATA_URL=https://[your_api_resource_is_here] npm run dev
```

## Tests

```bash
npm run test
```

## Subscribe to the repository to get any updates. Use the repository's Issues/PRs to reach me for any feature requests.
