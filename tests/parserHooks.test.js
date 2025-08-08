import path from "path";
import os from "os";
import fs from "fs-extra";
import { execa } from "execa";
import { generateFromYaml } from "../parser/parserModule.js";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("execa", () => ({ execa: vi.fn().mockResolvedValue({ exitCode: 0 }) }));

function tmpDir(prefix = "zgf-hooks-") {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

describe("hooks integration via generateFromYaml", () => {
  beforeEach(() => {
    execa.mockClear();
  });

  it("runs preGenerate, afterEach per file, and postGenerate in order with templated env and default cwd", async () => {
    const workDir = await tmpDir();
    const outDir = path.join(workDir, "out");
    const templateDir = path.join(workDir, "template");
    await fs.ensureDir(templateDir);

    const templatePath = path.join(templateDir, "component.zgf.yaml");

    const yaml = `
params:
  componentName:
    placeholder: "Name"
    type: string
    default: "MyWidget"
  addPublicApi:
    placeholder: "Public"
    type: boolean
    default: true
files:
  - name: "{{=componentName}}.tsx"
    content: |
      export default {} as any;
  - name: "index.ts"
    condition: "{{=addPublicApi}}"
    content: |
      export {};
hooks:
  preGenerate:
    - run: "echo PRE in {{=outputDir}}"
  afterEach:
    - run: "echo FILE {{=fileName}} at {{=filePath}}"
      env:
        COMPONENT: "{{=componentName}}"
        FILE: "{{=fileName}}"
  postGenerate:
    - run: "echo POST {{=componentName}}"
`;

    await fs.writeFile(templatePath, yaml, "utf8");

    await generateFromYaml(templatePath, { componentName: "Btn" }, outDir);

    expect(await fs.pathExists(path.join(outDir, "Btn.tsx"))).toBe(true);
    expect(await fs.pathExists(path.join(outDir, "index.ts"))).toBe(true);


    expect(execa).toHaveBeenCalledTimes(4);

    expect(execa.mock.calls[0][0]).toBe("echo PRE in " + outDir);
    expect(execa.mock.calls[0][1]).toEqual(
      expect.objectContaining({ cwd: outDir, shell: true })
    );

    const after1 = execa.mock.calls[1];
    const after2 = execa.mock.calls[2];

    expect(after1[0]).toMatch(/^echo FILE Btn\.tsx at /);
    expect(after2[0]).toMatch(/^echo FILE index\.ts at /);

    expect(after1[1].cwd).toBe(outDir);
    expect(after2[1].cwd).toBe(outDir);

    expect(after1[1].env.COMPONENT).toBe("Btn");
    expect(after1[1].env.FILE).toBe("Btn.tsx");
    expect(after2[1].env.COMPONENT).toBe("Btn");
    expect(after2[1].env.FILE).toBe("index.ts");

    const post = execa.mock.calls[3];
    expect(post[0]).toBe("echo POST Btn");
    expect(post[1].cwd).toBe(outDir);
  });

  it("respects when condition and optional timeout", async () => {
    const workDir = await tmpDir();
    const outDir = path.join(workDir, "out");
    const templateDir = path.join(workDir, "template");
    await fs.ensureDir(templateDir);

    const templatePath = path.join(templateDir, "component.zgf.yaml");

    const yaml = `
params:
  componentName:
    placeholder: "Name"
    type: string
    default: "X"
  add:
    placeholder: "Add?"
    type: boolean
    default: false
files:
  - name: "{{=componentName}}.txt"
    content: |
      ok
hooks:
  afterEach:
    - run: "echo always"
    - run: "echo conditional"
      when: "{{=add}}"
      timeout: 20000
`;

    await fs.writeFile(templatePath, yaml, "utf8");

    await generateFromYaml(templatePath, { add: false }, outDir);

    expect(execa).toHaveBeenCalledTimes(1);
    expect(execa.mock.calls[0][0]).toBe("echo always");

    const opts = execa.mock.calls[0][1];

    expect(Object.prototype.hasOwnProperty.call(opts, "timeout")).toBe(true);
    expect(opts.timeout).toBeUndefined();
  });
});
