export default function (plop) {
  // create your generators here
  plop.setGenerator('day', {
    description: 'plopfile to plop AOC days',
    prompts: [
      {
        type: 'input',
        name: 'day',
        message: 'AOC Day',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'day{{day}}/part1.js',
        templateFile: 'plop-templates/part.hbs',
      },
      {
        type: 'add',
        path: 'day{{day}}/part2.js',
        templateFile: 'plop-templates/part.hbs',
      },
      {
        type: 'add',
        path: 'day{{day}}/input.txt',
      },
      {
        type: 'add',
        path: 'day{{day}}/prompt.md',
      },
    ],
  })
}
