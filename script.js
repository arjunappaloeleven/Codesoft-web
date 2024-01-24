let displayValue = '0';
let currentOperator = '';
let firstOperand = '';
let waitingForSecondOperand = false;

function updateDisplay() {
    document.getElementById('display').innerText = (currentOperator !== '') ? `${firstOperand} ${currentOperator} ${waitingForSecondOperand ? '' : displayValue}` : displayValue;
}


function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        displayValue = (displayValue === '0') ? number : displayValue + number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (waitingForSecondOperand) {
        displayValue = '0.';
        waitingForSecondOperand = false;
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    currentOperator = '';
    firstOperand = '';
    waitingForSecondOperand = false;
    updateDisplay();
}

function setOperator(operator) {
    if (currentOperator !== '') {
        calculateResult();
    }
    firstOperand = displayValue;
    currentOperator = operator;
    waitingForSecondOperand = true;
    updateDisplay();
}

function calculateResult() {
    if (waitingForSecondOperand) {
        return;
    }

    const operand1 = parseFloat(firstOperand);
    const operand2 = parseFloat(displayValue);

    if (isNaN(operand1) || isNaN(operand2) || !currentOperator) {
        clearDisplay();
        return;
    }

    switch (currentOperator) {
        case '+':
            displayValue = (operand1 + operand2).toString();
            break;
        case '-':
            displayValue = (operand1 - operand2).toString();
            break;
        case '*':
            displayValue = (operand1 * operand2).toString();
            break;
        case '/':
            if (operand2 !== 0) {
                displayValue = (operand1 / operand2).toString();
            } else {
                displayValue = 'Error';
            }
            break;
    }

    currentOperator = '';
    waitingForSecondOperand = true;
    updateDisplay();
}

// Initial display update
updateDisplay();
