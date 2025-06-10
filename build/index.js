#!/usr/bin/env node
"use strict";
/**
 * mvc-generator-cli
 * by Anas Yakubu ✨
 *
 * Generates a boilerplate MVC folder structure for Node.js/Express applications.
 */
const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");
// Function to run shell commands
function runCommand(command) {
    try {
        execSync(command, { stdio: "inherit" });
    }
    catch (error) {
        console.error(`❌ Failed to execute: ${command}`);
        process.exit(1);
    }
}
// Function to create a folder if it doesn't exist
function createFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`✅ Created: ${folderPath}`);
    }
}
// Function to create an index.ts file
function createIndexFile() {
    const indexContent = `
// Entry point
import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(\`🚀 Server is running on http://localhost:\${PORT}\`);
});
`;
    fs.writeFileSync("src/index.ts", indexContent.trimStart());
    console.log(`✅ Created: src/index.ts`);
}
// Function to create placeholder files in folders
function createPlaceholderFile(folder, filename = "index.ts", content = "") {
    const filePath = path.join(folder, filename);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created: ${filePath}`);
}
// Main initialization function
function init() {
    console.log("\n🚀 Generating Node.js MVC structure...\n");
    // Create src folder
    createFolder("src");
    // Core folders
    const folders = [
        "config",
        "controllers",
        "middleware",
        "models",
        "routes",
        "services",
        "types",
        "utils/helpers"
    ];
    folders.forEach((folder) => createFolder(path.join("src", folder)));
    // Create index.ts
    createIndexFile();
    // Create placeholder files
    folders.forEach((folder) => {
        const filePath = folder === "utils/helpers" ? "helpers.ts" : "index.ts";
        createPlaceholderFile(path.join("src", folder), filePath, `// ${folder} ${filePath}`);
    });
    // Create .env file
    fs.writeFileSync(".env", "PORT=5000\n");
    console.log("✅ Created: .env");
    // Create .gitignore file
    const gitignoreContent = `
node_modules
dist
.env
`;
    fs.writeFileSync(".gitignore", gitignoreContent.trimStart());
    console.log("✅ Created: .gitignore");
    // Initialize package.json if not exists
    if (!fs.existsSync("package.json")) {
        console.log("\n📦 Initializing package.json...");
        runCommand("npm init -y");
    }
    // Install dependencies
    console.log("\n📦 Installing core dependencies (express, dotenv)...");
    runCommand("npm install express dotenv");
    // Install dev dependencies
    console.log("\n🛠️ Installing dev dependencies (TypeScript, nodemon, etc)...");
    runCommand("npm install -D typescript ts-node @types/node @types/express nodemon");
    // Create tsconfig.json
    const tsconfig = {
        "compilerOptions": {
            "target": "ES6",
            "module": "commonjs",
            "rootDir": "src",
            "outDir": "dist",
            "strict": true,
            "esModuleInterop": true
        }
    };
    fs.writeFileSync("tsconfig.json", JSON.stringify(tsconfig, null, 2));
    console.log("✅ Created: tsconfig.json");
    // Create nodemon.json for auto-restart
    const nodemonConfig = {
        "watch": ["src"],
        "ext": "ts",
        "exec": "ts-node src/index.ts"
    };
    fs.writeFileSync("nodemon.json", JSON.stringify(nodemonConfig, null, 2));
    console.log("✅ Created: nodemon.json");
    console.log("\n🎉 Node.js MVC structure generated successfully!");
    console.log("\n👉 To start your app, run: npx nodemon\n");
}
init();
