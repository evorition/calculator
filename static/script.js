let operandOne = NaN, operandTwo = NaN;
let operator = "";
let reset = false;

const historyDisplay = document.querySelector("#history");
const currentDisplay = document.querySelector("#current");
const equalsButton = document.querySelector("#equals");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

equalsButton.addEventListener("click", evaluate);
numberButtons.forEach(button => button.addEventListener("click", getNumber));
operatorButtons.forEach(op => op.addEventListener("click", getOperator));

function getNumber() {
  if (currentDisplay.textContent === "0" || reset) {
    currentDisplay.textContent = "";
    reset = false;
  }
  currentDisplay.textContent += this.value;
}

function getOperator() {
  if (operator && !reset) {
    evaluate();
  }
  operator = this.value;
  operandOne = +currentDisplay.textContent;
  historyDisplay.textContent = `${operandOne} ${operator}`;
  reset = true;
}

function evaluate() {
  if (!operator) {
    reset = true;
    return;
  }
  operandTwo = +currentDisplay.textContent;
  if (operator === "/" && operandTwo === 0) {
    currentDisplay.textContent = "Cannot divide by zero";
    reset = true;
    return;
  }
  currentDisplay.textContent = operate(operator, operandOne, operandTwo);
  historyDisplay.textContent = `${operandOne} ${operator} ${operandTwo} =`;
  reset = true;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(op, a, b) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}
