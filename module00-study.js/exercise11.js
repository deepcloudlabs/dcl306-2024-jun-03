numbers = [10, 60, 30, 20, 50, 40]
// imperative programming: procedural programming, oop, ...
let solution = 0;
for (let number of numbers) {
    if (number > 30) {
        let cubed = number ** 3;
        solution += cubed;
    }
}
console.log(`solution is ${solution}`);