numbers = [10, 60, 30, 20, 50, 40]
let higherThan30 = x => x > 30;
let toCube = value => value ** 3;
let toSum = (a, b) => a + b;
// declarative programming: functional programming (HoF, Pure Function), oop
let solution = numbers.filter(higherThan30)
                      .map(toCube)
                      .reduce(toSum);
console.log(`solution is ${solution}`);