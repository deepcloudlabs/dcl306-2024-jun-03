class Circle {
    constructor(x, y, radius, color, thickness) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.style = { color: color, thickness: thickness};
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

let circle1 = new Circle(0, 0, 1, "Red", 10);
let circle2 = {...circle1}; // shallow cloning the circle object
circle2.style = {...circle1.style};
circle2.style.thickness = 100;
console.log(circle1);
console.log(circle2);