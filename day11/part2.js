class Monkey {
  constructor(txtBlock) {
    const [monkey, starting, operation, test, ifTrue, ifFalse] = txtBlock
      .split('\n')
      .map((txt) => txt.trim())

    this.id = monkey[7]

    this.items = starting
      .split(':')[1]
      .trim()
      .split(',')
      .map((i) => parseInt(i))
      .reverse()

    let [_, num] = test.split('Test: divisible by ')
    this.test = parseInt(num)

    this.count = 0
    this.inspect = (item) => {
      this.count++
      let [_, expression] = operation.split(' = ')
      expression = expression.replace(/old/g, item)
      const [lval, op, rval] = expression.split(' ')
      switch (op) {
        case '*':
          return parseInt(lval) * parseInt(rval)
        case '+':
          return parseInt(lval) + parseInt(rval)
        default:
          return 0
      }
    }

    this.findTarget = (item) => {
      let [_, num] = test.split('Test: divisible by ')
      if (item % parseInt(num) == 0) {
        return ifTrue.split(' ').pop()
      } else {
        return ifFalse.split(' ').pop()
      }
    }

    this.catch = (item) => {
      this.items.reverse()
      this.items.push(item)
      this.items.reverse()
    }
  }
}

export default (input) => {
  const monkeys = {}
  input.split('\n\n').forEach((txtBlock) => {
    const monkey = new Monkey(txtBlock)
    monkeys[monkey.id] = monkey
  })

  const rounds = [...Array(10000).keys()]
  const mod = Object.values(monkeys)
    .map((m) => m.test)
    .reduce((p, t) => p * t, 1)
  rounds.forEach((round) => {
    Object.keys(monkeys).forEach((id) => {
      const monkey = monkeys[id]
      while (monkey.items.length > 0) {
        let item = monkey.items.pop()
        item = monkey.inspect(item)
        item = item % mod
        let target = monkey.findTarget(item)
        monkeys[target].catch(item)
      }
    })
  })

  const [most, second] = Object.values(monkeys)
    .map((monkey) => monkey.count)
    .sort((a, b) => b - a)

  const monkeyBusiness = most * second

  return `The level of monkey business in this situation is ${monkeyBusiness}`
}
