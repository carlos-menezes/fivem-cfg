import { defineConfig } from "rolldown";

export default defineConfig([
	{
		input: "src/index.ts",
		output: {
			dir: "dist",
			format: "esm",
			cleanDir: true,
			entryFileNames: "index.js",
			chunkFileNames: "_chunk-[name]-[hash].js",
		},
	},
	{
		input: "src/cli.ts",
		output: {
			dir: "dist",
			format: "esm",
			entryFileNames: "cli.mjs",
		},
		platform: "node",
		external: [/node:/, "jiti"],
	},
]);
