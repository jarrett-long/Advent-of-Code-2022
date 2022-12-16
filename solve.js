import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fs from 'fs'

export const solve = async (day, part) => {
  const input = fs.readFileSync(`./day${day}/input.txt`, 'utf8')

  const solution = (await import(`./day${day}/part${part}.js`)).default

  return solution(input)
}

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

const answer = await solve(argv.day, argv.part)

console.log(answer)
