function displayOutput() {
  let display = document.getElementById('display');
  display.textContent = calc.output;
}

function clearOutput() {
  calc.output = '';
  displayOutput();
}

function clear() {
  clearOutput();
  for (let attr of ['lastInput', 'operator', 'needsNextOperand']) {
    calc[attr] = null;
  }
}

function operate(operator, a, b) {
  switch (operator) {
    // hex codes
    case ('\x2b'): return a + b;
    case ('\u2212'): return a - b;
    case ('\xD7'): return a * b;
    case ('\xF7'):
      if (b === 0) return 'Bad. Divide by 0 error.';
      else return a / b;
  }
}

const calc = {
  lastInput: null,
  output: '',
  total: null,
  operator: null,
  needsNextOperand: false,
  numberButtons: document.querySelectorAll('.number-btn'),
  operatorButtons: document.querySelectorAll('.operator-btn'),
  clearButton: document.getElementById('clear-btn')
};

calc.numberButtons.forEach(btn => btn.addEventListener('click', () => {
  // if last input was =, also clear i.e., resets calculator
  if (calc.needsNextOperand || calc.lastInput === '=') {
    calc.needsNextOperand = false;
    clearOutput();
  }
  calc.output += btn.textContent;
  calc.lastInput = btn.textContent;
  displayOutput();
}))

calc.operatorButtons.forEach(btn => btn.addEventListener('click', () => {
  let operator = btn.textContent;
  let output = Number(calc.output);
  clearOutput();

  if (!calc.operator) {
    calc.total = output;
    calc.operator = operator;
  }
  // if last input was operator (except =), update operator
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
  console.table(calc);
}));

calc.clearButton.addEventListener('click', clear);
