#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const init_1 = require("./commands/init");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('init [name]', 'Initialize a new Node.js project with TypeScript, Express, and other dependencies', (yargs) => {
    return yargs.positional('name', {
        type: 'string',
        describe: 'Project name',
        default: 'my-app'
    });
}, (argv) => {
    (0, init_1.initApp)(argv.name);
})
    .demandCommand(1, 'You need to provide at least one command')
    .help()
    .argv;
