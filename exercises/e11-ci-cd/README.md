# E11 — CI/CD

> **Concept:** Tests should run automatically on every push, without a human pressing a button.

## What you need
- A GitHub account with your fork of this repo
- The `.github/workflows/e2e.yml` file (already in the repo)
- Starter spec: copy `smoke.starter.spec.ts` → `tests/smoke.spec.ts`

## What the workflow does

Open `.github/workflows/e2e.yml`. It:

1. Triggers on every `push` and `pull_request`
2. Installs Node 20 and runs `npm ci` (reproducible installs from the lockfile)
3. Installs only the Chromium browser (faster than all three)
4. Starts the app: `node index.js &`
5. Waits for `/health` to respond before running tests
6. Runs `npm run test:unit` then `npx playwright test`
7. Uploads the HTML report **and** traces as artefacts — even on failure

## Steps

1. **Push your changes** to GitHub (your fork):
   ```bash
   git add .
   git commit -m "E11: add ci workflow"
   git push
   ```

2. Go to your repo on GitHub → **Actions** tab.

3. Watch the workflow run. It should go green.

4. **Introduce a deliberate failure:**
   - Break a test locally (e.g. change an assertion to the wrong expected value)
   - Push
   - Watch the workflow go red
   - Download the `playwright-report` artefact — open `index.html` in a browser

5. Fix the test, push again — watch it go green.

## Stretch goals
- Add a `test:unit` step that runs `npm run test:unit` before Playwright
- Add a matrix strategy to run against Chrome, Firefox, and WebKit
- Add Slack/Teams notification on failure

## Done when
- [ ] A green run appears in GitHub Actions after push
- [ ] You've downloaded and opened the HTML report artefact
- [ ] You've seen the workflow go red and diagnosed the failure from the report
