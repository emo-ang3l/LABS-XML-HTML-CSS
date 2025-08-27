// файл script.js
window.onload = function(){ 

let a = ''
let b = ''
let expressionResult = ''
let selectedOperation = null
const MAX_LENGTH = 10 // Максимальная длина числа на экране

// окно вывода результата
outputElement = document.getElementById("result")

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

// Функция для форматирования числа в экспоненциальную форму при необходимости
function formatNumber(number) {
    const num = parseFloat(number)
    
    // Если число NaN или бесконечность
    if (isNaN(num)) return 'Ошибка'
    if (!isFinite(num)) return 'Бесконечность'
    
    // Для очень больших или очень маленьких чисел используем экспоненциальную форму
    if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-10 && num !== 0)) {
        return num.toExponential(6).replace(/e\+?/, 'e')
    }
    
    // Преобразуем в строку и проверяем длину
    let numStr = num.toString()
    
    // Если число с плавающей точкой и слишком длинное
    if (numStr.includes('.') && numStr.length > MAX_LENGTH) {
        // Округляем до нужного количества знаков
        const integerPart = numStr.split('.')[0]
        const availableDecimalPlaces = MAX_LENGTH - integerPart.length - 1
        
        if (availableDecimalPlaces > 0) {
            return num.toFixed(availableDecimalPlaces)
        } else {
            return Math.round(num).toString()
        }
    }
    
    // Если целое число слишком длинное, используем экспоненциальную форму
    if (numStr.length > MAX_LENGTH && !numStr.includes('.')) {
        return num.toExponential(6).replace(/e\+?/, 'e')
    }
    
    return numStr
}

// Функция для проверки и добавления цифры
function canAddDigit(currentNumber, digit) {
    if (currentNumber.includes('e')) {
        // Если число уже в экспоненциальной форме, ограничиваем ввод
        return false
    }
    
    const testNumber = currentNumber + digit
    if (testNumber.length <= MAX_LENGTH) {
        return true
    }
    
    // Если число становится слишком длинным, автоматически преобразуем в экспоненциальную форму
    const num = parseFloat(testNumber)
    if (Math.abs(num) > 1e9) {
        return false // Преобразуем автоматически в formatNumber
    }
    
    return testNumber.length <= MAX_LENGTH
}

function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
            if (canAddDigit(a, digit)) {
                a += digit
                outputElement.innerHTML = formatNumber(a)
            }
        }
    } else {
        if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
            if (canAddDigit(b, digit)) {
                b += digit
                outputElement.innerHTML = formatNumber(b)
            }
        }
    }
}

// устанавка колбек-функций на кнопки циферблата по событию нажатия
digitButtons.forEach(button => {
    button.onclick = function() {
        const digitValue = button.innerHTML
        onDigitButtonClicked(digitValue)
    }
});

// установка колбек-функций для кнопок операций
document.getElementById("btn_op_mult").onclick = function() { 
    if (a === '') return
    selectedOperation = 'x'
}
document.getElementById("btn_op_plus").onclick = function() { 
    if (a === '') return
    selectedOperation = '+'
}
document.getElementById("btn_op_minus").onclick = function() { 
    if (a === '') return
    selectedOperation = '-'
}
document.getElementById("btn_op_div").onclick = function() { 
    if (a === '') return
    selectedOperation = '/'
}

// кнопка очищения
document.getElementById("btn_op_clear").onclick = function() { 
    a = ''
    b = ''
    selectedOperation = ''
    expressionResult = ''
    outputElement.innerHTML = '0'
}

// кнопка удаления последнего символа (<)
document.getElementById("btn_op_delet").onclick = function() { 
    if (!selectedOperation) {
        if (a !== '') {
            a = a.slice(0, -1)
            outputElement.innerHTML = a === '' ? '0' : formatNumber(a)
        }
    } else {
        if (b !== '') {
            b = b.slice(0, -1)
            outputElement.innerHTML = b === '' ? '0' : formatNumber(b)
        }
    }
}

// кнопка квадратного корня (√)
document.getElementById("btn_op_koren").onclick = function() { 
    if (!selectedOperation) {
        if (a !== '') {
            const num = parseFloat(a)
            if (num >= 0) {
                const result = Math.sqrt(num)
                a = formatNumber(result)
                outputElement.innerHTML = a
            } else {
                outputElement.innerHTML = 'Ошибка'
                a = ''
            }
        }
    } else {
        if (b !== '') {
            const num = parseFloat(b)
            if (num >= 0) {
                const result = Math.sqrt(num)
                b = formatNumber(result)
                outputElement.innerHTML = b
            } else {
                outputElement.innerHTML = 'Ошибка'
                b = ''
            }
        }
    }
}

// кнопка квадрата числа (x²)
document.getElementById("btn_op_double").onclick = function() { 
    if (!selectedOperation) {
        if (a !== '') {
            const num = parseFloat(a)
            const result = num * num
            a = formatNumber(result)
            outputElement.innerHTML = a
        }
    } else {
        if (b !== '') {
            const num = parseFloat(b)
            const result = num * num
            b = formatNumber(result)
            outputElement.innerHTML = b
        }
    }
}

// кнопка факториала (x!)
document.getElementById("btn_op_x").onclick = function() { 
    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    if (!selectedOperation) {
        if (a !== '') {
            const num = parseInt(a);
            if (num >= 0 && num <= 170) {
                const result = factorial(num)
                a = formatNumber(result)
                outputElement.innerHTML = a;
            } else if (num > 170) {
                outputElement.innerHTML = 'Слишком большое';
                a = '';
            } else {
                outputElement.innerHTML = 'Ошибка';
                a = '';
            }
        }
    } else {
        if (b !== '') {
            const num = parseInt(b);
            if (num >= 0 && num <= 170) {
                const result = factorial(num)
                b = formatNumber(result)
                outputElement.innerHTML = b;
            } else if (num > 170) {
                outputElement.innerHTML = 'Слишком большое';
                b = '';
            } else {
                outputElement.innerHTML = 'Ошибка';
                b = '';
            }
        }
    }
}

// кнопка изменения знака (+/-)
document.getElementById("btn_op_sign").onclick = function() { 
    if (!selectedOperation) {
        if (a !== '' && a !== '0') {
            // Для экспоненциальной формы обрабатываем отдельно
            if (a.includes('e')) {
                const parts = a.split('e')
                const coefficient = parseFloat(parts[0]) * -1
                a = coefficient + 'e' + parts[1]
            } else {
                a = a.startsWith('-') ? a.substring(1) : '-' + a
            }
            outputElement.innerHTML = formatNumber(a);
        }
    } else {
        if (b !== '' && b !== '0') {
            if (b.includes('e')) {
                const parts = b.split('e')
                const coefficient = parseFloat(parts[0]) * -1
                b = coefficient + 'e' + parts[1]
            } else {
                b = b.startsWith('-') ? b.substring(1) : '-' + b
            }
            outputElement.innerHTML = formatNumber(b);
        }
    }
}

// кнопка процента (%)
document.getElementById("btn_op_percent").onclick = function() { 
    if (!selectedOperation) {
        if (a !== '') {
            const result = parseFloat(a) / 100
            a = formatNumber(result)
            outputElement.innerHTML = a;
        }
    } else {
        if (b !== '') {
            const result = parseFloat(b) / 100
            b = formatNumber(result)
            outputElement.innerHTML = b;
        }
    }
}

// кнопка расчёта результата
document.getElementById("btn_op_equal").onclick = function() { 
    if (a === '' || b === '' || !selectedOperation)
        return
        
    // Преобразуем числа из экспоненциальной формы если нужно
    const numA = parseFloat(a)
    const numB = parseFloat(b)
        
    switch(selectedOperation) { 
        case 'x':
            expressionResult = numA * numB;
            break;
        case '+':
            expressionResult = numA + numB;
            break;
        case '-':
            expressionResult = numA - numB;
            break;
        case '/':
            if (numB === 0) {
                outputElement.innerHTML = 'Ошибка';
                a = '';
                b = '';
                selectedOperation = null;
                return;
            }
            expressionResult = numA / numB;
            break;
    }
    
    // Форматируем результат
    a = formatNumber(expressionResult);
    b = '';
    selectedOperation = null;

    outputElement.innerHTML = a;
}

}; 