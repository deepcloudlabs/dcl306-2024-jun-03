// 1. Event-driven Programming --> Callback
// Backend
// System Event: TimeOut Event
console.log("Application is just started!");
let timer1 = setInterval(function (e){
    console.log("New timeout event has arrived!");
}, 3_000);

setTimeout(function () {
    clearInterval(timer1);
    console.log("Timer is just stopped");
}, 30_000);
