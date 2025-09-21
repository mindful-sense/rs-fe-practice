import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.config({
    extends: ["next", "prettier"],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    overrides: [
      {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        parser: "@typescript-eslint/parser",
        settings: {
          react: { version: "detect" },
          "import/resolver": {
            typescript: true,
            node: true,
          },
        },
        extends: [
          "plugin:import/recommended",
          "plugin:import/react",
          "plugin:import/typescript",
        ],
        plugins: ["import"],
        rules: {
          "import/default": "off",
          "import/no-named-as-default": "off",
          "import/no-named-as-default-member": "off",
          "import/no-cycle": "error",
          "import/order": [
            "error",
            {
              groups: [
                "builtin",
                "external",
                "internal",
                "parent",
                "sibling",
                "index",
                "object",
              ],
              // "newlines-between": "always",
              alphabetize: { order: "asc", caseInsensitive: true },
            },
          ],
        },
      },
    ],
  }),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
