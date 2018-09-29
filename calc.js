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
const mathDisplay = document.querySelector('.main-display p');
function evaluateMathString() {
  const inputmathString = mathDisplay.textContent;
  let mathString = inputmathString;
  const regex = /-?\d+[.]?\d*[-/*+]-?\d+[.]?\d*/i;
  // the regex (?:(?:[/*-+]-)|^(?: ?-))? checks for a negating sign '-' by matching a '-' sign
  // preceded by a blank space/operator symbol(/,*,-,+) or at the beginning of the math string.
  const regexAddition = /(-?\d+[.]?\d*)(\+)(-?\d+[.]?\d*)/i;
  const regexAdditionAndSubstraction = /(-?\d+[.]?\d*)(\+|-)(-?\d+[.]?\d*)/i;
  const regexSubstraction = /(-?\d+[.]?\d*)(-)(-?\d+[.]?\d*)/i;
  const regexMultplication = /(-?\d+[.]?\d*)(\*)(-?\d+[.]?\d*)/i;
  const regexDivision = /(-?\d+[.]?\d*)(\/)(-?\d+[.]?\d*)/i;
  // let result = regex.exec(mathString);
  while (regex.test(mathString)) {
    evaluatePEDMAS();
  }
  const result = mathString;
  mathDisplay.textContent = result;

  return result;

  function sendToOperator(match, p1, p2, p3) {
    return `${operator(p2, p1, p3)}`;
  }
  function evaluatePEDMAS() {
    if (regexDivision.test(mathString)) {
      mathString = mathString.replace(regexDivision, sendToOperator);
    } else if (regexMultplication.test(mathString)) {
      mathString = mathString.replace(regexMultplication, sendToOperator);
    } else if (regexAdditionAndSubstraction.test(mathString)) {
      mathString = mathString.replace(regexAdditionAndSubstraction, sendToOperator);
    // } else if (regexSubstraction.test(mathString)) {
    //   mathString = mathString.replace(regexSubstraction, sendToOperator);
    }
  }
}
function addToMathString(x) {
  if (mathDisplay.textContent === '' && /[./*+]/.test(x)) return;
  if (/[-*/+]$/i.test(mathDisplay.textContent) && /[./*+]/.test(x)) return;
  if (mathDisplay.textContent === '-' && /[-./*+]/.test(x)) return;
  if (/--$/i.test(mathDisplay.textContent) && /[-./*+]/.test(x)) return;
  if (/[.]$/i.test(mathDisplay.textContent) && /[.]/.test(x)) return;
  if (/(?:\d[.]\d*)$/i.test(mathDisplay.textContent) && /[.]/.test(x)) return;
  mathDisplay.textContent += x;
}
function clearMathDisplay() {
  mathDisplay.textContent = '';
}
function backspace() {
  mathDisplay.textContent = mathDisplay.textContent.slice(0, -1);
}
