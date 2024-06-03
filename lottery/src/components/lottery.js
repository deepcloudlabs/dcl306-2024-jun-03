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

    draw = (event) => {
        let newNumbers = [...this.state.numbers];
        this.generateLotteryNumbers(this.state.column).forEach(row => newNumbers.push(row));
        this.setState({numbers: newNumbers},()=>{
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
                    </div>
                    <table className="table table-active table-hover table-striped">
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
                            this.state.numbers.map( row => (
                                <tr>

                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>)
    }

}

export default Lottery;