import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export const initApp = (projectName: string) => {
  const projectPath = path.join(process.cwd(), projectName);

  console.log(`\n🚀 Creating project: ${projectName}`);
  fs.mkdirSync(projectPath);

  process.chdir(projectPath);
  execSync('npm init -y', { stdio: 'inherit' });

  console.log('\n📦 Installing dependencies...');
  execSync('npm install express dotenv cors mongoose axios', { stdio: 'inherit' });
  execSync('npm install --save-dev typescript ts-node @types/node @types/express @types/cors', { stdio: 'inherit' });

  console.log('\n✨ Initializing TypeScript config...');
  execSync('npx tsc --init', { stdio: 'inherit' });

  console.log('\n✅ Project setup complete!');
  console.log(`\n📂 Project files created in: ${projectPath}`);
  console.log('You can now start building your Node.js application with TypeScript and Express!');
};
