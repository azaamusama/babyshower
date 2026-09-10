// ─────────────────────────────────────────────────────────────────────────
// GAME CONTENT — edit this file to customize the party!
//
// Everything guests see (titles, instructions, questions, statements,
// answers) lives here. Nothing about the wording is hard-coded into the
// screens, so you can freely rewrite any text below without touching any
// other file.
//
// Any item marked `isExample: true` is placeholder content Claude wrote
// only to demo the flow — swap it for your own before the party. Items
// without `isExample` (instructions, materials, setup text) are generic
// enough to keep, but feel free to change those too.
//
// Each game has a `type` that decides which on-screen interaction it uses:
//   'vote-lie'        → three statements, guests vote which is the lie
//   'timer-challenge'  → setup + rules + optional countdown, no questions
//   'more-likely'      → one question at a time, two choices (Partner A/B)
//   'find-item'        → a scenario, then a few item choices to pick from
//
// `badge` (optional) shows a small label on the game's card and screen,
// e.g. "Boys only" — the Starter game always shows "Starter" instead.
// ─────────────────────────────────────────────────────────────────────────

export const PARTNER_A_NAME = "Partner A";
export const PARTNER_B_NAME = "Partner B";

export const games = [
  {
    id: "starter-two-truths",
    order: 1,
    title: "2 Truths & a Lie — Starter",
    subtitle: "Opening icebreaker",
    isStarter: true,
    type: "vote-lie",
    shortDescription:
      "A quick warm-up round to get every guest involved before the main games begin.",
    purpose: "Break the ice and get everyone participating immediately.",
    format: "One short round at the beginning of the event.",
    instructions: [
      "Read the three statements out loud (or let guests read them on screen).",
      "Everyone votes on which statement they think is the lie.",
      "Reveal the answer, then move on to the next game.",
    ],
    materials: [],
    hasTimer: false,
    timerSeconds: null,
    hasWinner: false,
    exampleNote: "Example statements — host: replace with your own before the party.",
    prompts: [
      {
        id: "starter-1",
        statements: [
          { id: "a", text: "I once cried during a diaper commercial.", isExample: true },
          { id: "b", text: "I have never changed a diaper in my life.", isExample: true },
          { id: "c", text: "I already have a nursery color picked out.", isExample: true },
        ],
        correctId: "b",
      },
    ],
  },
  {
    id: "diaper-changing-balloon",
    order: 2,
    title: "Diaper Changing Balloon",
    subtitle: "Timed challenge",
    isStarter: false,
    type: "timer-challenge",
    shortDescription:
      "A hilarious diaper-changing race using a balloon as the pretend baby.",
    purpose: "A humorous diaper-changing challenge without using a real baby.",
    format: "Participants use a balloon as the pretend baby.",
    instructions: [
      "Give each player a balloon 'baby' and a diaper.",
      "On 'go', players race to diaper their balloon baby correctly.",
      "First player finished with a properly secured diaper wins the round.",
    ],
    materials: ["Balloons", "Diapers", "A marker (optional, for a balloon face)"],
    hasTimer: true,
    timerSeconds: 45,
    hasWinner: true,
    exampleNote: null,
    prompts: [],
  },
  {
    id: "whos-more-likely",
    order: 3,
    title: "Who's More Likely?",
    subtitle: "Guess together",
    isStarter: false,
    type: "more-likely",
    shortDescription:
      "Guests guess which parent-to-be is more likely to do or say something.",
    purpose: "Get guests involved in guessing which parent-to-be is more likely to do something.",
    format: "One question at a time, with two choices — one for each parent.",
    instructions: [
      "Read the question out loud.",
      "Guests point to, hold up a card for, or tap the parent they think is more likely.",
      "Reveal which parent the couple actually picked.",
    ],
    materials: [],
    hasTimer: false,
    timerSeconds: null,
    hasWinner: false,
    exampleNote: null,
    prompts: [],
  },
  {
    id: "find-a-pair-of-socks",
    order: 4,
    title: "Find a Pair of Socks",
    subtitle: "Sock scramble",
    isStarter: false,
    type: "timer-challenge",
    shortDescription:
      "Race to find and match the scattered baby socks before time runs out.",
    purpose: "A fast, active matching game that gets everyone up and searching.",
    format: "Players race against the clock to find and match sock pairs.",
    instructions: [
      "Before the round, hide several mismatched baby socks around the room.",
      "On 'go', players search for socks and match them back into pairs.",
      "First player (or team) to find and match a full pair wins the round.",
    ],
    materials: ["Several pairs of baby socks", "Hiding spots around the room"],
    hasTimer: true,
    timerSeconds: 45,
    hasWinner: true,
    exampleNote: null,
    prompts: [],
  },
  {
    id: "balloon-belly-grab",
    order: 5,
    title: "Balloon Belly Grab",
    subtitle: "Boys only",
    isStarter: false,
    badge: "Boys only",
    type: "timer-challenge",
    shortDescription:
      "Grab the item from the floor with a balloon under your shirt.",
    purpose: "A silly race testing balance and nerve with a 'baby bump' in the way.",
    format: "One player (or one at a time) at a race against the clock.",
    instructions: [
      "Each player puts a balloon under his shirt, like a baby bump.",
      "On 'go', the player must bend down and grab the item from the floor without popping the balloon.",
      "Fastest time without popping the balloon wins the round.",
    ],
    materials: ["Balloons", "One small item to grab off the floor (e.g. a sock or spoon)"],
    hasTimer: true,
    timerSeconds: 30,
    hasWinner: true,
    exampleNote: null,
    prompts: [],
  },
];

export function getGameByIndex(index) {
  return games[index] ?? null;
}

export const totalGames = games.length;
