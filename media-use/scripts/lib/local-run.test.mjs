import { strict as assert } from "node:assert";
import { test } from "node:test";
import { runLocalModel } from "./local-run.mjs";

const strongCpu = { ramMB: 16000, gpu: { present: false, vramMB: 0 }, appleSilicon: false };
const tiny = { ramMB: 512, gpu: { present: false, vramMB: 0 }, appleSilicon: false };
const ok = () => {}; // which/exec that succeed

test("recommends the CLI path when no local tier fits the machine", () => {
  const r = runLocalModel("tts", { specs: tiny, which: ok, exec: ok });
  assert.equal(r.recommend, "cli");
});

test("recommends install when the tool is not on PATH", () => {
  const r = runLocalModel("tts", {
    specs: strongCpu,
    which: () => {
      throw new Error("not found");
    },
    exec: ok,
    vars: { text: "hi", out: "/tmp/v.wav" },
  });
  assert.equal(r.recommend, "install");
  assert.equal(r.model, "kokoro");
  assert.match(r.command, /pip install kokoro/);
});

test("runs the model and returns the output path when installed", () => {
  let ranBin = "";
  let ranArgs = [];
  const r = runLocalModel("tts", {
    specs: strongCpu,
    which: ok,
    exec: (bin, args) => {
      ranBin = bin;
      ranArgs = args;
    },
    vars: { text: "hello world", voice: "af_heart", out: "/tmp/v.wav" },
  });
  assert.equal(r.model, "kokoro");
  assert.equal(r.out, "/tmp/v.wav");
  assert.equal(ranBin, "python");
  assert.deepEqual(ranArgs, ["-m", "kokoro", "--text", "hello world", "--voice", "af_heart", "--out", "/tmp/v.wav"]);
});

test("shell metacharacters in vars remain isolated inside a single argv element", () => {
  let ranBin = "";
  let ranArgs = [];
  const maliciousText = 'hello $(touch /tmp/pwned) `id` ; rm -rf / "quoted"';
  const r = runLocalModel("tts", {
    specs: strongCpu,
    which: ok,
    exec: (bin, args) => {
      ranBin = bin;
      ranArgs = args;
    },
    vars: { text: maliciousText, voice: "af_heart", out: "/tmp/out $(evil).wav" },
  });
  assert.equal(r.model, "kokoro");
  assert.equal(ranBin, "python");
  const textIndex = ranArgs.indexOf("--text");
  assert.ok(textIndex >= 0);
  assert.equal(ranArgs[textIndex + 1], maliciousText);
  const outIndex = ranArgs.indexOf("--out");
  assert.ok(outIndex >= 0);
  assert.equal(ranArgs[outIndex + 1], "/tmp/out $(evil).wav");
});

test("a failing run degrades to an install recommendation, never throws", () => {
  const r = runLocalModel("upscale", {
    specs: strongCpu,
    which: ok,
    exec: () => {
      throw new Error("boom");
    },
    vars: { in: "a.png", out: "b.png" },
  });
  assert.equal(r.recommend, "install");
});
