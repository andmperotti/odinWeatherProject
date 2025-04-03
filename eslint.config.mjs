import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([eslintPluginPrettierRecommended]);
