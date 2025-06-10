"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const initApp = (projectName) => {
    const projectPath = path_1.default.join(process.cwd(), projectName);
    console.log(`\n🚀 Creating project: ${projectName}`);
    fs_1.default.mkdirSync(projectPath);
    process.chdir(projectPath);
    (0, child_process_1.execSync)('npm init -y', { stdio: 'inherit' });
    console.log('\n📦 Installing dependencies...');
    (0, child_process_1.execSync)('npm install express dotenv cors mongoose axios', { stdio: 'inherit' });
    (0, child_process_1.execSync)('npm install --save-dev typescript ts-node @types/node @types/express @types/cors', { stdio: 'inherit' });
    console.log('\n✨ Initializing TypeScript config...');
    (0, child_process_1.execSync)('npx tsc --init', { stdio: 'inherit' });
    console.log('\n✅ Project setup complete!');
    console.log(`\n📂 Project files created in: ${projectPath}`);
    console.log('You can now start building your Node.js application with TypeScript and Express!');
};
exports.initApp = initApp;
