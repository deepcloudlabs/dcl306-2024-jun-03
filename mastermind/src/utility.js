function createDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createSecret(level = 3) {
    let digits = [createDigit(1, 9)];
    while (digits.length < level) {
        let digit = createDigit(0, 9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
    }
    let secret = digits.reduce((number, digit) => 10 * number + digit, 0);
    console.log(secret);
    return secret;
}

export class Move {
    constructor(guess, perfectMatch, partialMatch, message) {
        this.guess = guess;
        this.perfectMatch = perfectMatch;
        this.partialMatch = partialMatch;
        if (message) {
            this.message = message;
            return;
        }
        this.message = "";
        if (perfectMatch > 0)
            this.message = `+${perfectMatch}`;
        if (partialMatch > 0)
            this.message = `${this.message}-${partialMatch}`;
        if (this.message.length === 0)
            this.message = "No Match";
    }
}

export function evaluateMove(secret, guess) {
    let perfectMatch = 0;
    let partialMatch = 0;
    let secretAsString = secret.toString();
    let guessAsString = guess.toString();
    for (let i = 0; i < secretAsString.length; i++) {
        let s = secretAsString.charAt(i);
        for (let j = 0; j < guessAsString.length; j++) {
            let g = guessAsString.charAt(j);
            if (s === g) {
                if (i === j)
                    perfectMatch++;
                else
                    partialMatch++;
            }
        }
    }
    return new Move(guess, perfectMatch, partialMatch);
}
