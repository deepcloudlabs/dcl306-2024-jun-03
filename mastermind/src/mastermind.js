import Container from "./components/container";
import CardHeader from "./components/card-header";
import Card from "./components/card";
import CardBody from "./components/card-body";
import {useState} from "react";
import {createSecret} from "./utility";
import FormGroup from "./components/form-group";
import InputText from "./components/input-text";
import Button from "./components/button";

const initialSecret = createSecret(3);

export default function Mastermind() {
    let [level, setLevel] = useState(3);
    let [lives, setLives] = useState(3);
    let [moves, setMoves] = useState([]);
    let [secret, setSecret] = useState(initialSecret);
    let [guess, setGuess] = useState(123);
    let [numberOfMoves, setNumberOfMoves] = useState(0);

    const handleChange = (event) => {
        setGuess(event.target.value);
    };
    const play = (event) => {
        
    };

    return(
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Game Console"></CardHeader>
                <CardBody>
                    <FormGroup>
                        <div><span>Level: {level}</span></div>
                        <div><span>Number of moves: {numberOfMoves}</span></div>
                        <div><span>Lives: {lives}</span></div>

                        <InputText label="Guess"
                                   value={guess}
                                   htmlFor="guess"
                                   handleInput={handleChange} />
                        <Button label="Play"
                                className="btn btn-success"
                                onClick={play} />
                    </FormGroup>
                </CardBody>
            </Card>
            <p></p>
            <Card>
                <CardHeader title="Game Statistics"></CardHeader>
                <CardBody></CardBody>
            </Card>
        </Container>
    )
}
