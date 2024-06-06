const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByClassName('button'));

let currentOperand = '';
let previousOperand = '';
let operation = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.innerText;
        const buttonId = button.id;

        // Clear the display and reset all variables
        if (buttonId === 'clear') {
            display.innerText = '0';
            currentOperand = '';
            previousOperand = '';
            operation = null;
        } 
        // Change the sign of the current number
        else if (buttonId === 'sign') {
            currentOperand = currentOperand ? (-parseFloat(currentOperand)).toString() : '';
            display.innerText = currentOperand || '0';
        } 
        // Convert current number to a percentage
        else if (buttonId === 'percent') {
            currentOperand = currentOperand ? (parseFloat(currentOperand) / 100).toString() : '';
            display.innerText = currentOperand || '0';
        } 
        // Set the operation to be performed
        else if (buttonId === 'divide' || buttonId === 'multiply' || buttonId === 'subtract' || buttonId === 'add') {
            if (currentOperand) {
                operation = buttonId;
                previousOperand = currentOperand;
                currentOperand = '';
            }
        } 
        // Calculate the result
        else if (buttonId === 'equals') {
            if (previousOperand && currentOperand && operation) {
                currentOperand = calculate(previousOperand, currentOperand, operation);
                display.innerText = currentOperand;
                previousOperand = '';
                operation = null;
            }
        } 
        // Handle number and decimal button clicks
        else {
            // Prevent multiple decimals in one number
            if (buttonId === 'decimal' && currentOperand.includes('.')) return;
            
            // Append the clicked button's value to the current operand
            currentOperand += buttonValue;
            display.innerText = currentOperand;
        }
    });
});

function calculate(prev, current, operation) {
    const prevNum = parseFloat(prev);
    const currentNum = parseFloat(current);

    switch (operation) {
        case 'divide':
            return (prevNum / currentNum).toString();
        case 'multiply':
            return (prevNum * currentNum).toString();
        case 'subtract':
            return (prevNum - currentNum).toString();
        case 'add':
            return (prevNum + currentNum).toString();
        default:
            return current;
    }
}
