import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { run } from './run.js'

const argv = yargs(hideBin(process.argv))
  .option('day', {
    alias: 'd',
    description: 'Which day to run',
    type: 'string',
  })
  .option('part', {
    alias: 'p',
    description: 'Which part to run',
    type: 'string',
  })
  .demandOption(['day', 'part']).argv

const answer = await run(argv.day, argv.part)

console.log(answer)
