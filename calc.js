function add (...args) {
  return args.reduce((a, b) => a + b);
}
function substract (...args) {
  return args.reduce((a, b) => a - b);
}
function multiply (...args) {
  return args.reduce((a, b) => a * b, 1);
}
function divide (...args) {
  return args.reduce((a, b) => a / b);
}
