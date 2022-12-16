import fs from 'fs'

export default function readInput(day) {
  const data = fs.readFileSync(`./day/${day}/day-${day}-input.txt`, {
    encoding: 'utf8',
    flag: 'r',
  })
  return data
}

export const readLines = (input) => input.split('\n')
