function add(...args) {
  return args.reduce((a, b) => a + b);
}
function substract(...args) {
  return args.reduce((a, b) => a - b);
}
function multiply(...args) {
  return args.reduce((a, b) => a * b, 1);
}
function divide(...args) {
  return args.reduce((a, b) => a / b);
}

function operator(...args) {
  const newArgs = args.slice(1).map(Number);
  if (args[0] === '+') return add(...newArgs);
  if (args[0] === '-') return substract(...newArgs);
  if (args[0] === '×' || args[0] === '*') return multiply(...newArgs);
  if (args[0] === '÷' || args[0] === '/') return divide(...newArgs);
  return `OOPS!!!, ${args[0]} is not a valid operator`;
}
