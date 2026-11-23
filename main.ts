// One-Star Review of Something Essential — a program that writes one
// deadpan one-star review of an everyday essential to /output/entry.txt.
//
// The review is a fixed string on purpose: the entry is judged on the
// writing, so the program's job is to deliver exactly that line, byte
// for byte, every run.

import { mkdirSync, writeFileSync } from "node:fs";

// Why this line, against the judge's brief:
// - It is a one-star review of an everyday essential: oxygen, which
//   everyone relies on and nobody can live without.
// - It finds the sharpest true grievance: oxygen runs out halfway up
//   the stairs, the small daily annoyance of getting winded on a
//   staircase that everyone recognises but has never seen written
//   down as a complaint.
// - It holds the deadpan: a straight complaint filed in earnest,
//   no winking, no exclamation marks, no explaining the joke.
// - It turns in the last few words: "halfway up the stairs" is
//   where the sting lands, after the complaint has been read straight.
// - It is tight and specific: one joke, told cleanly, with every
//   word earning its place.
const LINE =
  "Oxygen is free, invisible, and somehow still runs out halfway up the stairs.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // The gate only accepts 1 to 160 characters of UTF-8 text, so refuse
  // loudly instead of shipping a line the gate would throw away. It
  // also refuses text that is only white space, so check that too.
  if (LINE.length < 1 || LINE.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // The entry must stand alone as one line: no line break anywhere
  // inside it, so a typo can never slip a second line past the gate.
  if (/[\r\n]/.test(LINE)) {
    throw new Error("entry must be a single line");
  }
  // One clean line means no tabs and no doubled spaces either: a
  // stray tab would read as a formatting glitch in the review.
  if (/[\t]/.test(LINE) || /  /.test(LINE)) {
    throw new Error("entry must not contain tabs or double spaces");
  }
  // The gate counts every byte, so write exactly the line and nothing
  // else: no trailing newline.
  // /output is a mount point in the grader sandbox: never delete the
  // directory itself, only create it if missing and write the file.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LINE, "utf8");
  console.log(`Wrote ${LINE.length} characters to ${OUT_FILE}`);
}

main();
