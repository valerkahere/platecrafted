import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

export default defineConfig([
    js.configs.recommended, // Much cleaner than using FlatCompat!

    // GLOBAL SETTINGS: This tells ESLint how to parse code
    {

        languageOptions: {
            ecmaVersion: "latest", // Use "latest" instead of 2017 for modern features
            sourceType: "module",  // This fixes the "Unexpected token import" error
            globals: {
                ...globals.node,
            },

            ecmaVersion: 2017,
            sourceType: "module",
        },

        
    },

    //  RULES & EXTENDS
    {
        // Apply these to all JS files
        files: ["**/*.js", "**/*.mjs"], 
        // Note: 'extends' inside a config object is a legacy pattern. 
        // With Flat Config, you spread the compat array directly.
        ...compat.extends("eslint:recommended")[0],

        rules: {
            "no-unused-vars": ["error", {
                argsIgnorePattern: "^_",
            }],
        },
    }
]);