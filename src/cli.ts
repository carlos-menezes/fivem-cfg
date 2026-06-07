#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Command } from "commander";
import { createJiti } from "jiti";
import type { ServerConfiguration } from "./server-configuration";

const program = new Command();

program
	.name("fivem-cfg")
	.description("Generate FiveM server.cfg from a TypeScript config file")
	.version("0.1.0")
	.requiredOption(
		"-i, --input <file>",
		"Input config file (server.config.ts/.mjs/.js/.mts)",
	)
	.option("-o, --output <file>", "Output file (defaults to stdout)")
	.action(async (options) => {
		const inputFile = resolve(options.input);
		const jiti = createJiti(import.meta.url, { interopDefault: true });
		const mod = await jiti.import<{ default: ServerConfiguration }>(inputFile);
		const result = mod.default.generate();

		if (options.output) {
			await writeFile(options.output, result, "utf-8");
			console.error(`wrote ${options.output}`);
		} else {
			console.log(result);
		}
	});

await program.parseAsync(process.argv);
