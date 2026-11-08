import { test } from "node:test";
import assert from "node:assert/strict";
import { isInstagramVisit, rumbleMode } from "./rumble-mode.ts";

test("?ref=ig counts as Instagram", () => {
  assert.equal(isInstagramVisit("?ref=ig", ""), true);
  assert.equal(isInstagramVisit("?ref=x", ""), false);
});

test("Instagram referrers count, other sites do not", () => {
  assert.equal(isInstagramVisit("", "https://l.instagram.com/?u=https%3A%2F%2Ftxclaude.org%2Flinks"), true);
  assert.equal(isInstagramVisit("", "https://www.instagram.com/texasclaude/"), true);
  assert.equal(isInstagramVisit("", "https://notinstagram.com/"), false);
  assert.equal(isInstagramVisit("", ""), false);
});

test("first visit rumbles, repeat visit does not", () => {
  assert.equal(rumbleMode({ reducedMotion: false, fromInstagram: false, seenBefore: false }), "rumble");
  assert.equal(rumbleMode({ reducedMotion: false, fromInstagram: false, seenBefore: true }), "none");
});

test("Instagram visits always get the cue", () => {
  assert.equal(rumbleMode({ reducedMotion: false, fromInstagram: true, seenBefore: true }), "rumble");
});

test("reduced motion gets a static highlight instead of the shake", () => {
  assert.equal(rumbleMode({ reducedMotion: true, fromInstagram: false, seenBefore: false }), "static");
  assert.equal(rumbleMode({ reducedMotion: true, fromInstagram: true, seenBefore: true }), "static");
  assert.equal(rumbleMode({ reducedMotion: true, fromInstagram: false, seenBefore: true }), "none");
});
