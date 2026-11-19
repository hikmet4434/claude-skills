import { execFileSync } from "node:child_process";
import { buildArgv, invokeExecutable, selectModel } from "./local-models.mjs";
import { probeSpecs } from "./specs.mjs";

// Run a USER-INSTALLED local model for a capability (tts/asr/upscale).
// Picks the best tier the machine supports (selectModel), checks the tool is on
// PATH, fills the model's invoke template, and runs it. Returns:
//   { model, tier, out }                              on success
//   { recommend:"install", model, command, reason }   when the tool isn't installed
//   { recommend:"cli", reason }                        when no tier fits the machine
// `exec` / `which` are injectable for tests.
//
// ponytail: "installed" = the invoke's first token is on PATH (e.g. `whisperx`,
// `realesrgan-ncnn-vulkan`). For `python -m kokoro` this only proves python
// exists; good enough to gate — the recommend.command names the real package.
// Upgrade to a per-tool probe if a "python present but package missing" run ever
// produces a confusing error instead of a clean recommend.

function defaultWhich(bin) {
  if (!bin || typeof bin !== "string" || bin.startsWith("-")) {
    throw new Error(`invalid binary name: ${bin}`);
  }
  const cmd = process.platform === "win32" ? "where" : "which";
  execFileSync(cmd, [bin], { stdio: "ignore", shell: false });
}

function defaultExec(bin, args) {
  execFileSync(bin, args, {
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
    timeout: 600000,
  });
}

export function runLocalModel(capability, opts = {}) {
  const {
    specs = probeSpecs(),
    exec = defaultExec,
    which = defaultWhich,
    vars = {},
    preferTier,
  } = opts;
  const sel = selectModel(capability, specs, { preferTier });
  if (sel.recommend) return sel; // no tier fits -> recommend the CLI path

  const { model } = sel;
  const bin = invokeExecutable(model.invoke);
  const argTemplates = Array.isArray(model.invoke)
    ? model.invoke.slice(1)
    : String(model.invoke).trim().split(/\s+/).slice(1);
  try {
    which(bin);
  } catch {
    return {
      recommend: "install",
      model: model.id,
      command: model.install,
      reason: `${model.id} not installed`,
    };
  }
  const args = buildArgv(argTemplates, vars, { missing: "empty" });
  try {
    exec(bin, args);
  } catch (e) {
    return {
      recommend: "install",
      model: model.id,
      command: model.install,
      reason: e.message || String(e),
    };
  }
  return { model: model.id, tier: sel.tier, out: vars.out };
}
