function displayOutput() {
  let display = document.getElementById('display');
  display.textContent = calc.output;
  document.getElementById('decimal-btn').disabled = calc.output.toString().includes('.');
}

function backspace() {
  calc.output = calc.output.toString().slice(0, -1);
  displayOutput();
}

function clearOutput() {
  calc.output = '';
  displayOutput();
}

function clear() {
  clearOutput();
  for (let attr of ['lastInput', 'total', 'operator', 'needsNextOperand']) {
    calc[attr] = null;
  }
}

function operate(operator, a, b) {
  operator = operator === '-' ? '\u2212' :
             operator === '*' ? '\xD7' :
             operator === '/' ? '\xF7' :
             operator;
  let result;
  switch (operator) {
    // hex codes
    case ('\x2b'):
      result = a + b;
      break;
    case ('\u2212'): 
      result = a - b;
      break;
    case ('\xD7'): 
      result = a * b;
      break;
    case ('\xF7'):
      if (b === 0) return 'Bad. Divide by 0 error.';
      else result = a / b;
  }
  return Number.isInteger(result) ? result : result.toFixed(4)
}

function determineDisplay(input) {
  // if last input was =, also clear i.e., resets calculator
  if (calc.needsNextOperand || calc.lastInput === '=') {
    calc.needsNextOperand = false;
    clearOutput();
  }
  calc.output += input;
  calc.lastInput = input;
  displayOutput();
}

function determineCalculation(operator) {
  let output = Number(calc.output);
  clearOutput();

  if (operator === '%') {
    calc.output = operate('\xF7', output, 100);
    calc.operator = null;
  } else if (!calc.operator) {
    calc.total = output;
    calc.operator = operator;
    calc.needsNextOperand = true;
  } // if last input was operator (except =), update operator
  else if (/[^=\d]/.test(calc.lastInput)) calc.operator = operator;
  // if lastInput was also =, breaks the operate function
  else if (operator === '=' && calc.lastInput !== '=') {
    calc.output = operate(calc.operator, calc.total, output);
    calc.operator = null;
  } else if (calc.lastInput !== '=') {
    calc.output = operate(calc.operator, calc.total, output);
    calc.total = calc.output;
    calc.operator = operator;
    calc.needsNextOperand = true;
  }
  displayOutput();
  calc.lastInput = operator;
}

const calc = {
  lastInput: null,
  output: '',
  total: null,
  operator: null,
  needsNextOperand: false
};

const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const clearButton = document.getElementById('clear-btn');
const deleteButton = document.getElementById('delete-btn');

numberButtons.forEach(btn => btn.addEventListener('click', () => determineDisplay(btn.textContent)))
operatorButtons.forEach(btn => btn.addEventListener('click', () => determineCalculation(btn.textContent)));
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', backspace);
document.addEventListener('keydown', (e) => {
  let key = e.key === 'Enter' ? '=' : e.key;
  if (/\d/.test(key)) determineDisplay(key);
  else if (/[+=\-\/*%]/.test(key)) determineCalculation(key);
  else if (key === 'Backspace') backspace();
})