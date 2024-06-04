function createDigit(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min;
}

export function createSecret(level=3){
    let digits = [createDigit(1,9)];
    while (digits.length < level){
           let digit = createDigit(0,9);
           if (digits.includes(digit)) continue;
           digits.push(digit);
    }
    return digits.reduce((number,digit) => 10 * number + digit, 0);
}
