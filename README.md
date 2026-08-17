# Baby Shower Games

A mobile-friendly webpage for running baby shower games live at the party: a welcome screen, a menu of six games, and a guided play-through with progress tracking, answer reveals, and a celebratory finish.

## Running it

```
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173) — on your phone, or cast/share your screen for the group.

## Editing game content

All game copy — titles, instructions, materials, questions, statements, and answers — lives in [`src/data/games.js`](src/data/games.js). Nothing about the wording is hard-coded into the screens, so you can edit that one file to customize everything.

Anything marked `isExample: true` is placeholder content meant to demo the flow — replace it with your own questions/statements before the party. Look for the `exampleNote` fields and `isExample` flags in the data file.

## Structure

- `src/data/games.js` — all editable game content
- `src/components/` — screens (Hero, GameMenu, GameView, CompletionScreen, etc.)
- `src/components/views/` — the four game interaction types (statement voting, timed challenges, more-likely questions, find-the-item)
- `src/styles/` — shared theme (colors, spacing, typography) and animations
