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
    id: "onesie-baby-rally",
    order: 2,
    title: "Onesie Baby Rally",
    subtitle: "Team challenge",
    isStarter: false,
    type: "timer-challenge",
    shortDescription:
      "A playful onesie-themed race between guests or teams.",
    purpose: "A light-hearted physical/competitive game centered around baby onesies.",
    format: "Fast-paced challenge between guests or teams.",
    instructions: [
      "Split guests into teams (or pairs) at the start of the round.",
      "On 'go', each team races to complete the onesie challenge — e.g. decorating or dressing a onesie as fast as possible.",
      "First team to finish (or the team with the best result) wins the round.",
    ],
    materials: ["Plain onesies", "Fabric markers or decorations", "A flat surface per team"],
    hasTimer: true,
    timerSeconds: 60,
    hasWinner: true,
    exampleNote: null,
    prompts: [],
  },
  {
    id: "diaper-changing-balloon",
    order: 3,
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
    order: 4,
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
    exampleNote: "Example questions — host: replace with your own before the party.",
    prompts: [
      {
        id: "more-likely-1",
        text: "Who's more likely to sleep through the baby's first cry?",
        isExample: true,
        choices: [
          { id: "a", label: PARTNER_A_NAME },
          { id: "b", label: PARTNER_B_NAME },
        ],
        correctId: "a",
      },
      {
        id: "more-likely-2",
        text: "Who's more likely to cry happy tears first?",
        isExample: true,
        choices: [
          { id: "a", label: PARTNER_A_NAME },
          { id: "b", label: PARTNER_B_NAME },
        ],
        correctId: "b",
      },
      {
        id: "more-likely-3",
        text: "Who's more likely to spoil the baby with too many toys?",
        isExample: true,
        choices: [
          { id: "a", label: PARTNER_A_NAME },
          { id: "b", label: PARTNER_B_NAME },
        ],
        correctId: "b",
      },
    ],
  },
  {
    id: "two-truths-and-a-lie",
    order: 5,
    title: "2 Truths & a Lie",
    subtitle: "Guessing game",
    isStarter: false,
    type: "vote-lie",
    shortDescription:
      "Three statements, one lie — can the guests spot it?",
    purpose: "A social guessing game that can involve the parents-to-be or guests.",
    format: "Three statements are displayed; exactly one is the lie.",
    instructions: [
      "Read the three statements out loud.",
      "Guests vote on which statement they believe is the lie.",
      "Reveal the answer.",
    ],
    materials: [],
    hasTimer: false,
    timerSeconds: null,
    hasWinner: false,
    exampleNote: "Example statements — host: replace with your own before the party.",
    prompts: [
      {
        id: "truths-2-1",
        statements: [
          { id: "a", text: "We found out the gender at a family cookout.", isExample: true },
          { id: "b", text: "We've already agreed on a middle name.", isExample: true },
          { id: "c", text: "We haven't picked a name yet at all.", isExample: true },
        ],
        correctId: "c",
      },
    ],
  },
  {
    id: "baby-emergency",
    order: 6,
    title: "Baby Emergency — Find the Item Needed",
    subtitle: "Quick response",
    isStarter: false,
    type: "find-item",
    shortDescription:
      "A baby emergency strikes — who can spot the right item fastest?",
    purpose: "Test how quickly guests can identify the right baby item for a situation.",
    format: "A baby-related emergency/situation is presented, followed by several possible items.",
    instructions: [
      "Read the scenario out loud.",
      "Guests choose (or physically find) the item they think is needed.",
      "Reveal the correct item.",
    ],
    materials: ["Optional: a table of real baby items for guests to physically grab"],
    hasTimer: false,
    timerSeconds: null,
    hasWinner: false,
    exampleNote: "Example scenarios — host: replace with your own before the party.",
    prompts: [
      {
        id: "emergency-1",
        scenario: "The baby just spit up all over their outfit right before photos!",
        isExample: true,
        choices: [
          { id: "a", label: "Burp cloth" },
          { id: "b", label: "Pacifier" },
          { id: "c", label: "Rattle" },
        ],
        correctId: "a",
      },
      {
        id: "emergency-2",
        scenario: "It's nap time but the baby won't settle down in the car.",
        isExample: true,
        choices: [
          { id: "a", label: "Bottle warmer" },
          { id: "b", label: "White noise machine" },
          { id: "c", label: "Bath toy" },
        ],
        correctId: "b",
      },
    ],
  },
];

export function getGameByIndex(index) {
  return games[index] ?? null;
}

export const totalGames = games.length;
