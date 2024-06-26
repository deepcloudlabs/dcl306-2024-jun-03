class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
//        this.area = this.area.bind(this);
//        this.circumference = this.circumference.bind(this);
//        this.printInfo = this.printInfo.bind(this);
    }

    area = () => {
        return Math.PI * this.radius * this.radius;
    }

    circumference = () => {
        return 2.0 * Math.PI * this.radius;
    }

    printInfo = () => {
        console.log(this);
       console.log(`Area of the circle is ${this.area()}`);
    }
}

let circle = new Circle(0, 0, 1, "Red");
// circle.printInfo(); // --> printInfo(circle)
setInterval(circle.printInfo, 3_000);
