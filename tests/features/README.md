# Feature Folder

This folder stores high-level Gherkin scenarios for the User Directory app.

Files:
- publish.feature: core UI publish-and-browse style flows (browse, filter, create validation, duplicate email, delete)
- auth.feature: API auth behavior
- llm.feature: non-deterministic AI endpoint checks

Note:
- These features are written to match the existing app flows in EXERCISES.md.
- Add matching step definitions under tests/steps when wiring to a BDD runner.
