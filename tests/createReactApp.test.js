import { describe, it, vi, expect, beforeAll, afterAll } from "vitest";
import fs from "fs-extra";
import path from "path";

import { createReactApp } from "../core/scaffold/react.js";

const tempRoot = path.resolve("temp-test");

const configurations = [
  { architecture: "atomic", language: "js" },
  { architecture: "atomic", language: "ts" },
  { architecture: "fsd", language: "js" },
  { architecture: "fsd", language: "ts" },
  { architecture: "empty", language: "js" },
  { architecture: "empty", language: "ts" },
];

// Mock askUser for each run
vi.mock("./../utils/requests.js", async () => {
  return {
    askUser: vi.fn((config) =>
      Promise.resolve({
        appName: config.appName,
        packageManager: "yarn",
        language: config.language,
        architecture: config.architecture,
        routing: true,
        privateRouting: true,
      })
    ),
  };
});

describe("integration test: creating 6 projects", async () => {
  beforeAll(async () => {
    await fs.remove(tempRoot);
    await fs.ensureDir(tempRoot);
  });

  afterAll(async () => {
    // await fs.remove(tempRoot);
  });

  for (const { architecture, language } of configurations) {
    const appName = `${architecture}-${language}`;
    const appPath = path.join(tempRoot, appName);

    it(`creates project ${appName}`, async () => {
      // Override askUser behavior for each call
      const askUser = (await import("./../utils/requests.js")).askUser;
      askUser.mockResolvedValueOnce({
        appName,
        packageManager: "yarn",
        language,
        architecture,
        routing: true,
        privateRouting: true,
        stateManager: "redux",
      });

      process.chdir(tempRoot);

      await createReactApp();

      // Checks
      const metaPath = path.join(appPath, ".meta.json");
      const nodeModulesPath = path.join(appPath, "node_modules");

      expect(await fs.pathExists(appPath)).toBe(true);
      expect(await fs.pathExists(metaPath)).toBe(true);
      expect(await fs.pathExists(nodeModulesPath)).toBe(true);

      const meta = await fs.readJson(metaPath);
      expect(meta.appName).toBe(appName);
      expect(meta.language).toBe(language);
      expect(meta.architecture).toBe(architecture);
    }, 90_000);
  }
});
