#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { initApp } from './commands/init';

yargs(hideBin(process.argv))
  .command(
    'init [name]',
    'Initialize a new Node.js project with TypeScript, Express, and other dependencies',
    (yargs) => {
      return yargs.positional('name', {
        type: 'string',
        describe: 'Project name',
        default: 'my-app'
      });
    },
    (argv) => {
      initApp(argv.name as string);
    }
  )
  .demandCommand(1, 'You need to provide at least one command')
  .help()
  .argv;
