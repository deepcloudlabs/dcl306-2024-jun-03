numbers = [10, 60, 30, 20, 50, 40]
console.log(numbers[3]);
console.log(numbers.length);
// External Loop #1
for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    console.log(number);
}
// External Loop #2
for (let i in numbers) {
    let number = numbers[i];
    console.log(number);
}
// External Loop #3
for (let number of numbers) {
    console.log(number);
}
// Internal Loop #4
numbers.forEach((number,i) => console.log(number));