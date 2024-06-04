# Millionaire game quiz.

IMPORTANT: Basically, project is still WIP. It has few bugs with edge cases and im working on it.

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


Data is loading dynamically from the API https://api.npoint.io/.
That remote json resource has data validation and could be easily extendable.
Feel free to put data url to QUIZ_DATA_URL env variable to use your own resource.

```bash
QUIZ_DATA_URL=https://[your_api_is_resource_here] npm run dev
```

BTW, you can find my schema example here https://www.npoint.io/docs/b7bd9c92c028169450f0 .

```bash
npm run test
```

## Subscribe to the repository to get any updates. Use the repository Issues/PRs to reach me for any feature requests.   