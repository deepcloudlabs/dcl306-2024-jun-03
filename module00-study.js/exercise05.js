async function gun() { // name function
    if (Math.random() < 0.3)
        throw "Something went wrong!";
    return 42;
}

console.log("Application is just started!");
gun().then(result => console.log(`Result is ${result}`))
    .catch(error => console.error(`Error is ${error}`));
console.log("Application is just stopped!");
