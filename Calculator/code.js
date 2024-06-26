// Initialise display elements
let display = document.getElementById('display');
let calculationDisplay = document.getElementById('calculation');

// Variables to keep track of the current input, the operator, and the previous input
let currentInput = '';
let operator = null;
let previousInput = '';
let lastInput = ''; // Track the last input type (number, operator, etc.)

// Function to append a number to the current input and update the display
function appendNumber(number) {
    // If last input was an operator, reset current input to the new number
    if (lastInput === 'operator') {
        currentInput = number;
    } else {
        currentInput += number; // Add the number to the current input
    }
    
    display.innerText = currentInput; // Update the display with the current input
    lastInput = 'number'; // Update last input type to number
}

// Function to handle operator buttons (+, -, *, /)
function appendOperator(op) {
    // If both inputs are empty, do nothing
    if (currentInput === '' && previousInput === '') return;

    // If both inputs are not empty, calculate the result before setting the new operator
    if (currentInput !== '' && previousInput !== '') {
        calculate();
    }

    // Set the operator and move the current input to the previous input
    operator = op;
    previousInput = currentInput || '0'; // Use '0' if currentInput is empty
    currentInput = '0'; // Reset current input to '0' after operator selection
    display.innerText = currentInput; // Update the display with '0'
    calculationDisplay.innerText = `${previousInput} ${operator}`; // Update calculation display
    lastInput = 'operator'; // Update last input type to operator
}

// Function to clear the entire display and reset variables
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    display.innerText = '0'; // Reset display to 0
    calculationDisplay.innerText = ''; // Clear the calculation display
    lastInput = ''; // Reset last input
}

// Function to clear the current entry only (CE button)
function clearCurrentEntry() {
    currentInput = '';
    display.innerText = '0'; // Reset current input on display to 0
    lastInput = ''; // Reset last input
}

// Function to delete the last character in the current input
function deleteLast() {
    currentInput = currentInput.slice(0, -1); // Remove the last character
    display.innerText = currentInput || '0'; // Update display, show 0 if input is empty
    lastInput = 'number'; // Update last input type to number
}

// Function to perform the calculation based on the operator and inputs
function calculate() {
    let result;
    const prev = parseFloat(previousInput); // Convert previous input to a number
    const current = parseFloat(currentInput); // Convert current input to a number

    // If either input is not a number, do nothing
    if (isNaN(prev) || isNaN(current)) return;

    // Check for division by zero
    if (operator === '/' && current === 0) {
        alert("Error: Cannot divide by zero"); // Show alert for division by zero
        currentInput = ''; // Clear the current input
        display.innerText = '0'; // Reset display to 0
        calculationDisplay.innerText = ''; // Clear the calculation display
        return;
    }

    // Perform the calculation based on the operator
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    // Update current input with the result, reset operator and previous input
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    display.innerText = result; // Show the result on the display
    calculationDisplay.innerText = ''; // Clear the calculation display
    lastInput = 'number'; // Update last input type to number
}

// Ensure the display elements are obtained after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    display = document.getElementById('display');
    calculationDisplay = document.getElementById('calculation');
});
