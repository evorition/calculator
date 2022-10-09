let operandOne = NaN, operandTwo = NaN;
let operator = "";
let reset = false;

const historyDisplay = document.querySelector("#history");
const currentDisplay = document.querySelector("#current");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");
const decimalButton = document.querySelector("#decimal");
const equalsButton = document.querySelector("#equals");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

clearButton.addEventListener("click", clearScreen);
backspaceButton.addEventListener("click", erase);
decimalButton.addEventListener("click", addDecimal);
equalsButton.addEventListener("click", evaluate);
numberButtons.forEach(button => button.addEventListener("click", () => {
  getNumber(button.value)
}));
operatorButtons.forEach(op => op.addEventListener("click", () => {
  getOperator(op.value)
}));

document.addEventListener("keydown", e => handleKeyboard(e.key));

function getNumber(value) {
  if (currentDisplay.textContent === "0" || reset) {
    currentDisplay.textContent = "";
    reset = false;
  }
  currentDisplay.textContent += value;
}

function addDecimal() {
  if (reset) {
    currentDisplay.textContent = "0.";
    reset = false;
    return;
  }
  if (currentDisplay.textContent.includes(".")) {
    return
  }
  currentDisplay.textContent += ".";
}

function getOperator(value) {
  if (operator && !reset) {
    evaluate();
  }
  operator = value;
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
  operator = "";
  reset = true;
}

function clearScreen() {
  operandOne = operandTwo = NaN;
  currentDisplay.textContent = "0";
  historyDisplay.textContent = ""
  operator = "";
  reset = false;
}

function erase() {
  currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
  if (currentDisplay.textContent === "") {
    currentDisplay.textContent = "0";
  }
}

function handleKeyboard(value) {
  if (value >= "0" && value <= "9") {
    getNumber(value);
  } else if (["+", "-", "*", "/"].includes(value)) {
    getOperator(value);
  } else if (value === "Enter") {
    evaluate();
  } else if (value === ".") {
    addDecimal();
  } else if (value === "Backspace") {
    erase();
  }
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
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}
