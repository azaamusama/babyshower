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
          {
            id: "a",
            text: "I have been chased by a desi aunty at a wedding to marry his son / her daughter.",
            isExample: true,
          },
          { id: "b", text: "I can eat biryani for breakfast.", isExample: true },
          {
            id: "c",
            text: "I have pretended to be asleep to avoid answering the door.",
            isExample: true,
          },
          {
            id: "d",
            text: "I have done shoplifting multiple times and never get caught.",
            isExample: true,
          },
        ],
        correctId: "d",
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
    id: "find-a-pair-of-socks",
    order: 3,
    title: "Find a Pair of Socks",
    subtitle: "Sock scramble",
    isStarter: false,
    type: "timer-challenge",
    shortDescription:
      "Dig through a bag of mixed-up socks and match as many pairs as you can before time's up.",
    purpose: "A fast matching game that gets everyone digging and sorting.",
    format: "Players race against the clock to sort a bag of mixed socks into matching pairs.",
    instructions: [
      "Before the round, mix several pairs of baby socks together in a bag or bowl.",
      "On 'go', each player digs through the bag and sorts socks into matching pairs.",
      "Whoever matches the most pairs before time runs out wins.",
    ],
    materials: ["A bag or bowl of mixed, unpaired baby socks (same sizes work best)"],
    hasTimer: true,
    timerSeconds: 30,
    hasWinner: true,
    exampleNote: null,
    prompts: [],
  },
  {
    id: "balloon-belly-grab",
    order: 4,
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
  {
    id: "whos-more-likely",
    order: 5,
    title: "Who's More Likely?",
    subtitle: "Guess together",
    isStarter: false,
    type: "more-likely",
    shortDescription:
      "Guests take turns asking their own “who's more likely to...” questions about the parents-to-be.",
    purpose:
      "An open-floor closer — guests make up their own questions instead of reading from a list.",
    format:
      "Anyone can ask a “who's more likely to...” question, and the group points to whichever parent they think fits.",
    instructions: [
      "Anyone can call out a “who's more likely to...” question about the parents-to-be.",
      "Everyone points to (or shouts) whichever parent they think is more likely.",
      "The parents-to-be reveal who it actually is, then someone else asks the next question.",
    ],
    materials: [],
    hasTimer: false,
    timerSeconds: null,
    hasWinner: false,
    exampleNote: null,
    prompts: [],
  },
  {
    id: "catch-the-family",
    order: 6,
    title: "Catch the Family",
    subtitle: "Arcade finale",
    isStarter: false,
    type: "catch-family",
    shortDescription:
      "Bouncing family faces need saving — slide the plank to keep them off the ground.",
    purpose:
      "A silly arcade closer — drag the plank left and right to bounce the family back up before they touch down.",
    format: "One player drags a paddle to keep bouncing balls from hitting the ground.",
    instructions: [
      "Drag left and right along the bottom of the arena to move the plank.",
      "Bounce each falling face back up before it touches the ground.",
      "See how many family members you can save before time runs out!",
    ],
    materials: [],
    hasTimer: true,
    timerSeconds: 25,
    hasWinner: true,
    exampleNote: null,
    prompts: [],
  },
];

export function getGameByIndex(index) {
  return games[index] ?? null;
}

export const totalGames = games.length;
