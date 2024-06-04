let circle = {
    x: 10,
    y: 20,
    radius: 30,
    color: "Red"
};

let {x,y,...rest} = circle;
console.log(x);
console.log(y);
console.log(rest);
