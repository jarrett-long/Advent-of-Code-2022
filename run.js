import fs from 'fs'

export const run = async (day, part) => {
  const input = fs.readFileSync(`./day${day}/input.txt`, 'utf8')

  const solution = (await import(`./day${day}/part${part}.js`)).default

  return solution(input)
}
