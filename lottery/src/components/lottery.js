// stateful component -> js class
import React from "react";

class Lottery extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = { // View Model --> View
            numbers: [],
            column: 3
        }

    }

    componentDidMount() {
        console.log("Component is up and running and waiting for your events!");
        this.draw()
    }

    generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generateOneLotteryNumber = () => {
        let numbers = [this.generateRandomNumber(1, 60)];
        while (numbers.length < 6) {
            let number = this.generateRandomNumber(1, 60);
            if (numbers.includes(number)) continue;
            numbers.push(number);
        }
        numbers.sort((x, y) => x - y);
        return numbers;
    }

    generateLotteryNumbers = (column) => {
        let numbers = [];
        for (let i = 0; i < column; i++) {
            numbers.push(this.generateOneLotteryNumber())
        }
        return numbers;
    }

    reset = (event) => {
        this.setState({numbers: [], column: this.state.column + 1})
    }

    draw = (event) => {
        let newNumbers = [...this.state.numbers];
        this.generateLotteryNumbers(this.state.column).forEach(row => newNumbers.push(row));
        this.setState({numbers: newNumbers}, () => {
            console.log(newNumbers)
        });
    }

    handleChange = (event) => {
        let newState = {...this.state};
        newState.column = Number(event.target.value);
        this.setState({column: Number(event.target.value)}, () => {
            console.log(this.state.column);
        }); // async
    }
    render = () => {
        let numbersTable = "";
        if (this.state.numbers.length > 0) {
            numbersTable = (
                <table className="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th>Row Number</th>
                        <th>Number #1</th>
                        <th>Number #2</th>
                        <th>Number #3</th>
                        <th>Number #4</th>
                        <th>Number #5</th>
                        <th>Number #6</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.numbers.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {
                                    row.map(
                                        number => <td key={number}>{number}</td>
                                    )
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>);
        }
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Lottery</h4>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="column" className="control-label">Column:</label>
                        <input type="text"
                               id="column"
                               name="column"
                               className="form-control"
                               onChange={this.handleChange}
                               value={this.state.column}/>
                        <button className="btn btn-primary" onClick={this.draw}>Draw</button>
                        <button className="btn btn-warning" onClick={this.reset}>Reset</button>
                    </div>
                    {numbersTable}
                </div>
            </div>)
    }

}

export default Lottery;