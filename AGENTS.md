# AGENTS.md

Welcome to the **Millionaire Quiz App** repository. This document serves as the single source of truth for AI agents (and human developers) to understand the project architecture, tech stack, conventions, workflows, and guardrails.

---

## 1. Project Overview & Tech Stack

A responsive quiz game based on "Who Wants to Be a Millionaire?", built with Next.js App Router and React 19.

- **Framework**: Next.js 16+ (App Router)
- **UI Library**: React 19 (Server Components by default, Server Actions)
- **Language**: TypeScript (strict mode, target `ES2017`, `moduleResolution: bundler`)
- **Styling**: Vanilla CSS Modules with CSS custom properties (responsive from 320px up to 4K displays)
- **Data Validation**: Zod 4+
- **Testing**: Vitest + React Testing Library + jsdom + Snapshot testing
- **Linting & Formatting**: `oxlint` (linter) & `oxfmt` (formatter) — fast Rust-based tools (no ESLint/Prettier)
- **Git Hooks**: Husky + lint-staged
- **Analytics & Observability**: `@vercel/analytics`, `@vercel/speed-insights`, `@vercel/toolbar`

---

## 2. Directory Structure & Path Aliases

### Path Aliases & Architectural Boundaries (defined in `tsconfig.json` & enforced by `oxlint`)

| Alias         | Path                | Purpose                                       |
| :------------ | :------------------ | :-------------------------------------------- |
| `@/*`         | `./*`               | Root fallback                                 |
| `@actions`    | `./app/_actions`    | Next.js Server Actions public entrypoint      |
| `@components` | `./app/_components` | Reusable React UI components public barrel    |
| `@lib/client` | `./app/_lib/client` | Client-only utilities                         |
| `@lib/server` | `./app/_lib/server` | Server-only utilities, cookies, data fetchers |
| `@lib/shared` | `./app/_lib/shared` | Shared schemas (Zod) and types                |

### Layer Import Rules

To prevent circular dependencies and enforce strict architectural encapsulation:

1. **External consumers** (pages, layouts, route handlers, `proxy.ts`) import **only** from public boundary aliases: `@components`, `@actions`, `@lib/server`, `@lib/client`, `@lib/shared`.
2. **Internal peer dependencies** within a layer (e.g. one component importing another component, or a utility importing a shared type) must use **strictly relative imports** (`../assets`, `../button`, `../../shared`). Deep wildcard aliases (`@components/*`, `@actions/*`) are **not defined** in `tsconfig.json` and are **blocked** by oxlint.
3. **`@lib/*` deep paths** (e.g. `@lib/server/cookies`, `@lib/shared/schema`) are blocked by oxlint — only the three public sub-aliases (`@lib/client`, `@lib/server`, `@lib/shared`) are allowed.
4. **All SVG icons and graphic frames** must be co-located in `app/_components/assets/` as pure React components (no `.svg` files in `public/`). Icons accept `IconProps` (`size?: number`, `className?: string`) and are always `aria-hidden="true"` — the **wrapper component** is responsible for accessible labels (e.g. `Button.Icon` passes `iconAlt` as `aria-label` on the `<button>` element).

### Directory Breakdown

```
├── .agents/skills/        # Specialized agent skills
├── .github/workflows/     # CI workflows (test.yml)
├── app/
│   ├── _actions/          # Server actions (e.g. process-answer.ts)
│   ├── _components/       # UI components with co-located css, tests, and barrel exports
│   │   ├── assets/        # SVG icons and vector frames as React components (e.g. HandIcon, OptionFrame, ProgressFrame)
│   │   ├── button/        # Compound Button component (Button, Button.Primary, Button.Icon)
│   │   ├── confetti/      # Canvas confetti on victory
│   │   ├── heading/       # Semantic Heading component (h1-h6)
│   │   ├── option-item/   # Quiz option item with responsive hexagon SVG borders
│   │   ├── option-list/   # Interactive answer selection form with Server Action
│   │   ├── progress-list/ # Step progression & rewards sidebar list
│   │   ├── sidebar/       # Collapsible mobile / desktop sidebar
│   │   └── index.ts       # Central barrel export for all components
│   ├── _lib/
│   │   ├── client/        # Client helpers (e.g. option label letter mapper A-D)
│   │   ├── server/        # Server data loading, cookie management, validation
│   │   └── shared/        # Shared Zod schemas (QuizListSchema) & TypeScript types
│   ├── _styles/           # Global styles, reset, and CSS variables
│   │   ├── globals.css
│   │   ├── normalize.css
│   │   └── variables.css  # Color palette, spacing, breakpoints, font tokens
│   ├── game-over/[id]/    # Game over & victory screen (score, retry button)
│   ├── kill-app/          # Error test page to trigger error boundary
│   ├── quiz/[id]/         # Quiz step dynamic route (Question, Options, Sidebar)
│   ├── error.tsx          # Custom Error Boundary page
│   ├── not-found.tsx      # Custom 404 page
│   ├── layout.tsx         # Root layout (fonts, providers, Vercel analytics)
│   ├── page.tsx           # Home / Start landing page
│   └── types.ts           # App-level types
├── public/                # Static assets
├── proxy.ts               # Step protection middleware guard
├── next.config.ts         # Next.js configuration
├── vitest.config.mts      # Vitest test configuration
├── .oxlintrc.json         # Oxlint configuration
├── .oxfmtrc.json          # Oxfmt configuration
└── package.json           # Scripts and dependencies
```

---

## 3. Core Architecture & Game Mechanics

### 1. Game Progression Flow

1. **Start Screen (`/`)**: Fetches first quiz step and displays start button.
2. **Quiz Step (`/quiz/[id]`)**:
   - Validates route parameter `id` using `validateRouteParam(id, z.coerce.number())`.
   - Fetches question & answers via `getQuizElement(quizId)`.
   - Submits chosen answer via `processAnswer` Server Action.
3. **Step Validation & Protection**:
   - `proxy.ts` guards `/quiz/:path*` to verify the `STEP` cookie matches the current step or redirects to the appropriate active step or home.
4. **Answer Processing (`app/_actions/process-answer.ts`)**:
   - Validates `formData`, checks answer correctness via `checkQuizAnswer`.
   - Delays response (`wait(2000)`) to let client animations play.
   - If incorrect: clears `STEP` cookie and redirects to `/game-over/[prevStep]`.
   - If last step reached & correct: clears `STEP` cookie and redirects to `/game-over/[currentStep]` (triggers confetti).
   - If correct and more steps remain: updates `STEP` cookie and redirects to `/quiz/[nextStep]`.

### 2. Data Fetching & Schema Validation

- Data is fetched remotely from `process.env.QUIZ_DATA_URL` (npoint.io) or falls back to a bundled JSON mock.
- Every quiz payload is parsed and validated using Zod (`QuizListSchema` in `@lib/shared/schema.ts`), guaranteeing 12 sequential steps, question strings, and valid answer choices.

---

## 4. Key Development Commands

| Command              | Action                                                       |
| :------------------- | :----------------------------------------------------------- |
| `npm run dev`        | Starts Next.js development server on `http://localhost:3000` |
| `npm run build`      | Builds application for production                            |
| `npm run start`      | Runs the production build                                    |
| `npm run test`       | Runs unit and snapshot tests with Vitest                     |
| `npm run test:watch` | Runs Vitest in watch mode                                    |
| `npm run lint`       | Runs `oxlint` check                                          |
| `npm run lint:fix`   | Runs `oxlint` with automated fixes and suggestions           |
| `npm run format`     | Runs `oxfmt --check`                                         |
| `npm run format:fix` | Formats all code using `oxfmt`                               |

---

## 5. Conventions & Best Practices for Agents

### 1. Server vs. Client Components

- **Default to Server Components**: Keep page routes and data fetching on the server.
- **Client Components**: Add `'use client'` only to components needing browser APIs, state (`useState`, `useActionState`), or client event listeners (e.g., `sidebar.tsx`, `option-list.tsx`, `confetti.tsx`).

### 2. Component Structure Pattern

Every component in `app/_components/` must follow this structure:

```
_components/component-name/
├── component-name.tsx          # Component implementation
├── component-name.module.css   # Co-located CSS Module
├── component-name.test.tsx     # Co-located unit and/or snapshot tests
├── __snapshots__/              # Vitest snapshots (if applicable)
└── index.ts                    # Re-exporting component
```

Export all public components through `app/_components/index.ts`.

### 3. Compound Components Pattern

When creating multi-variant components (like `Button`, `Button.Primary`, `Button.Icon`), expose variants as static properties on the base component (e.g. `Button.Primary = ButtonPrimary`) and export from the module.

### 4. Styling Guidelines

- Use pure **CSS Modules** (`*.module.css`).
- Import CSS custom variables from `@styles/variables.css` (e.g., `var(--color-orange-100)`, `var(--breakpoint-tablet)`).
- Use `classnames` (`cn(...)`) for conditional class composition.
- Avoid inline styles and external utility CSS frameworks.
- Ensure all components are responsive across mobile (`320px`), tablet, and desktop (`4K`).

### 5. Type Safety & Validation

- Never use `any`. Explicitly type props, server actions, and utility returns.
- Always validate unknown external input (route params, query params, FormData, API responses) using **Zod**.
- Keep schemas centralized in `app/_lib/shared/schema.ts`.

### 6. Linting & Formatting Standards

- Do NOT install or introduce ESLint or Prettier configurations.
- Adhere to `oxlint` and `oxfmt` configurations.
- Ensure imports follow the Layer Import Rules (`@components`, `@lib/server`, relative internal imports).

---

## 6. Agent Action Checklist

Before finalizing any modifications or creating PRs, agents must run and verify:

- [ ] TypeScript types are clean without type errors.
- [ ] `npm run lint` passes without errors.
- [ ] `npm run format` passes or files are formatted via `npm run format:fix`.
- [ ] `npm run test` passes (update snapshots with `npx vitest -u` if UI structure intentionally changed).
- [ ] Existing path aliases and barrel exports are maintained.
- [ ] Responsive design principles (mobile to desktop) are preserved.
