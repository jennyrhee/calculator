function displayOutput() {
  let display = document.getElementById('display');
  display.textContent = output;
}

function clearOutput() {
  output = '';
  displayOutput();
}

let output = '';

const buttons = document.querySelectorAll('.number-btn');
buttons.forEach(btn => btn.addEventListener('click', () => {
  output += btn.textContent;
  displayOutput();
}))

const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', clearOutput);
