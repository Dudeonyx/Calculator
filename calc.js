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
let answerFlag = 0;
function evaluateMathString() {
  const inputmathString = mathDisplay.textContent;
  let mathString = inputmathString;
  const regex = /-?\d+[.]?\d*[-/*+]-?\d+[.]?\d*/i;
  if (!regex.test(mathString)) return;
  // the regex (?:(?:[/*-+]-)|^(?: ?-))? checks for a negating sign '-' by matching a '-' sign
  // preceded by a blank space/operator symbol(/,*,-,+) or at the beginning of the math string.
  const regexAddition = /(-?\d+[.]?\d*)(\+)(-?\d+[.]?\d*)/i;
  const regexAdditionAndSubstraction = /(-?\d+[.]?\d*)(\+|-)(-?\d+[.]?\d*)/i;
  const regexSubstraction = /(-?\d+[.]?\d*)(-)(-?\d+[.]?\d*)/i;
  const regexMultplication = /(-?\d+[.]?\d*)(\*)(-?\d+[.]?\d*)/i;
  const regexDivision = /(-?\d+[.]?\d*)(\/)(-?\d+[.]?\d*)/i;
  // let result = regex.exec(mathString);

  function sendToOperator(match, p1, p2, p3) {
    return `${Math.round(operator(p2, p1, p3) * 10000000000) / 10000000000}`;
  }
  function evaluatePEDMAS() {
    if (regexDivision.test(mathString)) {
      mathString = mathString.replace(regexDivision, sendToOperator);
    } else if (regexMultplication.test(mathString)) {
      mathString = mathString.replace(regexMultplication, sendToOperator);
    } else if (regexAdditionAndSubstraction.test(mathString)) {
      mathString = mathString.replace(regexAdditionAndSubstraction, sendToOperator);
    }
    //  else if (regexSubstraction.test(mathString)) {
    //   mathString = mathString.replace(regexSubstraction, sendToOperator);
    // }
  }
  while (regex.test(mathString)) {
    evaluatePEDMAS();
  }
  const result = mathString;
  mathDisplay.textContent = result;
  answerFlag = 1;

  return result;
}

function addToMathString(x) {
  if (answerFlag === 1) {
    answerFlag = 0;
    mathDisplay.textContent = '0';
  }
  if (mathDisplay.textContent === '' && /[./*+]/.test(x)) return;
  if (/[-*/+]$/i.test(mathDisplay.textContent) && /[./*+]/.test(x)) return;
  if (mathDisplay.textContent === '-' && /[-./*+]/.test(x)) return;
  if (/--$/i.test(mathDisplay.textContent) && /[-./*+]/.test(x)) return;
  if (/[.]$/i.test(mathDisplay.textContent) && /[.]/.test(x)) return;
  if (/(?:\d[.]\d*)$/i.test(mathDisplay.textContent) && /[.]/.test(x)) return;
  if (mathDisplay.textContent === '0' && /[0-9]/.test(x)) mathDisplay.textContent = '';
  mathDisplay.textContent += x;
}
function clearMathDisplay() {
  if (answerFlag === 1) {
    answerFlag = 0;
    mathDisplay.textContent = '0';
  } else mathDisplay.textContent = '0';
}
function backspace() {
  if (answerFlag === 1) {
    answerFlag = 0;
    mathDisplay.textContent = '0';
    return;
  }
  mathDisplay.textContent = mathDisplay.textContent.slice(0, -1);
}
window.addEventListener('keyup', (event) => {
  // console.dir(event);
  if (/[-0-9./*+]/i.test(event.key)) addToMathString(event.key);
  if (event.key === 'Enter' || event.key === '=') evaluateMathString();
  if (event.key === 'Backspace') backspace();
});
