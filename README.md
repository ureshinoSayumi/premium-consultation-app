# Premium Consultation App

Expo SDK 58 · React Native · TypeScript

## Quick start

```bash
git clone <repo-url>
cd premium-consultation-app
git checkout feature/premium-consultation   # use the PR branch
npm install
npm run web                                 # fastest preview (no emulator)
```

Or `npm start`, then press `w` (web) / `a` (Android) / `i` (iOS).

**Node:** 20 or 22 LTS recommended. **npm** 10+.

After launch: home screen → turn **Feature enabled** on → **Open Premium Consultation**.

```bash
npm run typecheck
npm test
```

## Demo controls (home)

| Control | What it does |
|---------|----------------|
| Feature enabled | On → open consultation; Off → Coming soon |
| Language EN / ZH | UI language |
| Plain / Infinite | Specialist list fetch mode |
| Force next fetch to fail | Demo error + Retry |

## Project layout

```
src/app/           routes: /  and  /consultation
src/features/      consultation UI, feature flag, dialog gate
src/data/          SpecialistRepository (hardcode → swap for CMS)
src/i18n/          EN / ZH
```

## Notes for reviewers

- **Feature flag:** `premiumConsultationEnabled` in `FeatureFlagContext`. Off → Coming soon dialog.
- **Dialog dedupe:** `createDialogGate().tryOpen(key)` is sync check+set — double tap same key opens once. Tests in `createDialogGate.test.ts`.
- **CMS swap:** change export in `src/data/specialists/index.ts` only.
- **Plain vs infinite:** `getAll` + `useQuery` vs `getPage` + `useInfiniteQuery` (near-end scroll). Toggle on home.
- **Contacts:** Simplybook booking, WhatsApp `+852 6030 0900` (MPF prefill), tel / mailto per PRD.

## Stack

Expo Router · TanStack Query · `@gorhom/bottom-sheet` · i18next
