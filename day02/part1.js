import { sumArray } from '../utils/sum.js'

export default function solve(input) {
  const wld = {
    RR: 'D',
    RP: 'W',
    RS: 'L',
    PR: 'L',
    PP: 'D',
    PS: 'W',
    SR: 'W',
    SP: 'L',
    SS: 'D',
  }

  const opponent = {
    A: 'R',
    B: 'P',
    C: 'S',
  }

  const player = {
    X: 'R',
    Y: 'P',
    Z: 'S',
  }

  const scores = {
    W: 6,
    L: 0,
    D: 3,
  }

  const weight = {
    R: 1,
    P: 2,
    S: 3,
  }

  const scoreRound = (o, p) => {
    return scores[wld[opponent[o] + player[p]]] + weight[player[p]]
  }

  const total = sumArray(
    input.split('\n').map((match) => {
      const [o, p] = match.split(' ')
      return scoreRound(o, p)
    })
  )

  return `Grand total: ${total}`
}
