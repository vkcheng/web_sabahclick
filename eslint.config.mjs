import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",
    ".claude/**",
    ".codex/**",
    ".cursor/**",
    ".windsurf/**",
    ".agent/**/*.log",
    ".shared/**/__pycache__/**",
    ".shared/**/*.pyc",
  ]),
]);

export default eslintConfig;
