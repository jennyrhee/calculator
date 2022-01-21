function displayOutput() {
  let display = document.getElementById('display');
  display.textContent = calc.output;
}

function clearOutput() {
  calc.output = '';
  displayOutput();
}

function operate(operator, a, b) {
  switch (operator) {
    // hex codes
    case ('\x2b'): return a + b;
    case ('\u2212'): return a - b;
    case ('\xD7'): return a * b;
    case ('\xF7'): return a / b;
  }
}

const calc = {
  output: '',
  total: 0,
  operator: null
};

const numberButtons = document.querySelectorAll('.number-btn');
numberButtons.forEach(btn => btn.addEventListener('click', () => {
  calc.output += btn.textContent;
  displayOutput();
}))

const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', clearOutput);
