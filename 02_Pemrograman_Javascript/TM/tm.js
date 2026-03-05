function fizzBuzz(inputArray) {
    if (!Array.isArray(inputArray)) {
        return "Input tidak valid";
    }

    let hasil = [];

    for (let i = 0; i < inputArray.length; i++) {
        let num = inputArray[i];

        if (num % 14 === 0) {
            hasil.push("FizzBuzz");
        } else if (num % 2 === 0) {
            hasil.push("Fizz");
        } else if (num % 7 === 0) {
            hasil.push("Buzz");
        } else {
            hasil.push(num);
        }
    }

    return hasil.join(" ");
}

module.exports = fizzBuzz;