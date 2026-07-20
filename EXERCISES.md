# AI-First QA Academy — Day 2 Exercises

> **App:** User Directory — a simple CRUD web app (Express + in-memory store, no DB)  
> **Start the app:** `npm start` → http://localhost:3000  
> **Run all e2e tests:** `npm test`  
> **Run unit tests:** `npm run test:unit`  
> **Run headed:** `npx playwright test --headed`

Each exercise has its own folder under `exercises/` with a `README.md` and (where applicable) a starter spec to copy into `tests/`.

---

## Exercise index

| # | Title | Concept | Starter spec? |
|---|---|---|---|
| [E1](exercises/e1-test-pyramid/) | Test Pyramid | Unit vs API vs UI | `auth.starter.spec.ts` |
| [E2](exercises/e2-locators/) | Finding the Locator | XPath → `getByRole` | `locators.starter.spec.ts` |
| [E3](exercises/e3-pick-locator/) | Pick Locator | Playwright codegen | `codegen.starter.spec.ts` |
| [E4](exercises/e4-ai-framework/) | Build with AI | Copilot-assisted test | `roleFilter.starter.spec.ts` |
| [E5](exercises/e5-exploratory/) | Exploratory → Automate | Explore first, then test | `deleteUser.starter.spec.ts` |
| [E6](exercises/e6-pom/) | Page Object Model | POM pattern | `pom.starter.spec.ts` |
| [E7](exercises/e7-test-independence/) | Test Independence | Fixtures, isolation | `independent.starter.spec.ts` |
| [E8](exercises/e8-break-the-app/) | Break the App | False-green lesson | `breakApp.starter.spec.ts` |
| [E9](exercises/e9-ai-feature/) | Non-deterministic AI | Assert on facts, not text | `llm.starter.spec.ts` |
| [E10](exercises/e10-trace-viewer/) | Trace Viewer | Debug failing tests | `trace.starter.spec.ts` |
| [E11](exercises/e11-ci-cd/) | CI/CD | Automate on push | `smoke.starter.spec.ts` |

---

## App user flows

| Flow | URL | Expected outcome |
|---|---|---|
| View all users | `/users` | Table shows 5 seeded users with Total Users = 5 |
| Filter by role | `/users` → radio buttons | Table and count update |
| Add a user | `/users/new` | Create User button disabled until all 4 fields filled |
| Duplicate email | `/users/new` → existing email | Alert: "email already exists" |
| Delete a user | `/users` → Delete | Row removed; status message appears |
| LLM Demo | `/llm` | Each click returns a different Dublin answer |
| API: auth | `POST /api/auth` | 200 + token; 401 on bad credentials |
| API: AI summary | `GET /api/users/:id/summary` | `{ summary, keyFacts }`; wording varies |
| API: reset | `POST /api/seed` | Restores all 5 seed users |

---

## Locators reference → [docs/locators-cheatsheet.md](docs/locators-cheatsheet.md)

## Slide reconciliation → see bottom of original detailed notes


