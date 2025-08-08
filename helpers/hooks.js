import { execa } from "execa";
import { evaluateCondition, renderTemplate } from "./template.js";

function normalizeHooks(hooksDef) {
  if (!hooksDef) return [];
  if (Array.isArray(hooksDef)) return hooksDef;
  return [hooksDef];
}

/**
 * Run a list of hook steps with context and options support.
 * Each step can be a string (command) or an object with fields:
 * { run, cwd?, shell?, continueOnError?, when?, timeout?, env? }
 */
export async function runHooks(baseContext, defaultCwd, steps, extraCtx = {}) {
  const list = normalizeHooks(steps);
  for (const step of list) {
    const isString = typeof step === "string";
    const runTmpl = isString ? step : step.run;
    if (!runTmpl) continue;

    const mergedCtx = { ...baseContext, ...extraCtx };

    if (!isString && step.when) {
      const shouldRun = evaluateCondition(step.when, mergedCtx);
      if (!shouldRun) continue;
    }

    const command = renderTemplate(runTmpl, mergedCtx);
    const cwd = step.cwd ? renderTemplate(step.cwd, mergedCtx) : defaultCwd;
    const shell = step.shell ?? true;
    const continueOnError = step.continueOnError ?? false;
    const timeout = !isString && typeof step.timeout === "number" ? step.timeout : undefined;

    let env;
    if (!isString && step.env && typeof step.env === "object") {
      env = {};
      for (const [k, v] of Object.entries(step.env)) {
        env[k] = typeof v === "string" ? renderTemplate(v, mergedCtx) : v;
      }
    }

    console.log(`🔧 Hook: ${command} (cwd=${cwd})`);
    try {
      await execa(command, {
        shell,
        stdio: "inherit",
        cwd,
        timeout,
        env: env ? { ...process.env, ...env } : process.env,
      });
    } catch (err) {
      console.error("❌ Hook failed:", err?.shortMessage || err?.message || err);
      if (!continueOnError) throw err;
    }
  }
}
