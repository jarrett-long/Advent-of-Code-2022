import fs from 'fs'

export const run = async (day, part, file = 'input') => {
  const input = fs.readFileSync(`./day${day}/${file}.txt`, 'utf8')

  const solution = (await import(`./day${day}/part${part}.js`)).default

  return solution(input)
}
