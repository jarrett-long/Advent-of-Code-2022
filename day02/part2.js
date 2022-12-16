import { sumArray } from '../utils/sum.js'

export default (input) => {
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

  const outcome = {
    X: 'L',
    Y: 'D',
    Z: 'W',
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

  const whatToPlay = {
    RW: 'P', // if they play rock and I need to win, I'll play paper
    RL: 'S',
    RD: 'R',
    PW: 'S',
    PL: 'R',
    PD: 'P',
    SW: 'R',
    SL: 'P',
    SD: 'S',
  }

  const scoreRound = (oKey, pKey) => {
    const wtp = whatToPlay[opponent[oKey] + outcome[pKey]]
    return scores[wld[opponent[oKey] + wtp]] + weight[wtp]
  }

  const total = sumArray(
    input.split('\n').map((match) => {
      const [o, p] = match.split(' ')
      return scoreRound(o, p)
    })
  )

  return `Grand total: ${total}`
}
