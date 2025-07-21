document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const ageOutput = document.getElementById('age-output');
    const inputs = [dayInput, monthInput, yearInput];

    // Add event listeners
    calculateBtn.addEventListener('click', calculateAge);
    inputs.forEach(input => {
        input.addEventListener('input', clearError);
    });

    function calculateAge() {
        // Reset any previous error states
        clearErrors();

        // Get input values
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);

        // Validate inputs
        if (isNaN(day) || day <= 0) {
            showError(dayInput, "Please enter a valid day");
            return;
        }

        if (isNaN(month) || month <= 0 || month > 12) {
            showError(monthInput, "Please enter a valid month");
            return;
        }

        if (isNaN(year)) {
            showError(yearInput, "Please enter a valid year");
            return;
        }

        if (isInvalidDate(day, month, year)) {
            showError(dayInput, "Please enter a valid date");
            return;
        }

        // Calculate age
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        
        if (birthDate > today) {
            showError(dayInput, "Birth date cannot be in the future");
            return;
        }

        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();

        // Adjust for negative months or days
        if (ageDays < 0) {
            ageMonths--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += lastMonth.getDate();
        }

        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

        // Display result with animation
        ageOutput.textContent = `Your age is ${ageYears} years, ${ageMonths} months, and ${ageDays} days`;
        ageOutput.parentElement.style.borderLeftColor = "#4cc9f0";
    }

    function isInvalidDate(day, month, year) {
        if (month < 1 || month > 12) return true;
        
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) return true;
        
        return false;
    }

    function showError(inputElement, message) {
        const parent = inputElement.parentElement;
        const errorElement = parent.querySelector('.error-message') || createErrorElement(parent);
        
        inputElement.classList.add('input-error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function createErrorElement(parent) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        parent.appendChild(errorElement);
        return errorElement;
    }

    function clearError() {
        this.classList.remove('input-error');
        const errorElement = this.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    function clearErrors() {
        inputs.forEach(input => {
            input.classList.remove('input-error');
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    }
});