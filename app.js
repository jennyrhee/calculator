function displayOutput() {
  let display = document.getElementById('display');
  display.textContent = output;
}

let output = '';

const buttons = document.querySelectorAll('.number-btn');
buttons.forEach(btn => btn.addEventListener('click', () => {
  output += btn.textContent;
  displayOutput();
}))
