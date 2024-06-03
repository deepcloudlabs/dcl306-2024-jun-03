function fun() { // name function
    if (Math.random() < 0.3)
        throw "Something went wrong!";
    return 42;
}

let result = fun();

function gun() { // name function
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            if (Math.random() < 0.3)
                reject("Something went wrong!");
            resolve(42);
        }, 10_000);
    })
}
console.log("Application is just started!");
gun().then( result => console.log(`Result is ${result}`))
     .catch( error => console.error(`Error is ${error}`));
console.log("Application is just stopped!");
