let Circle = function (x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.area = function () {
        return Math.PI * this.radius * this.radius;
    }
    this.circumference = function () {
        return 2.0 * Math.PI * this.radius;
    }
}

let circle1 = new Circle(0,0,1,"Red");
let circle2 = new Circle(10,-10,100,"Blue");
console.log(`Area of circle1 is ${circle1.area()}`);
console.log(`Area of circle2 is ${circle2.area()}`);