import Container from "./components/container";
import CardHeader from "./components/card-header";
import Card from "./components/card";
import CardBody from "./components/card-body";
import {useState} from "react";
import {createSecret, evaluateMove} from "./utility";
import FormGroup from "./components/form-group";
import InputText from "./components/input-text";
import Button from "./components/button";
import Table from "./components/table";
import TableHeader from "./components/table-header";
import TableBody from "./components/table-body";
import Badge from "./components/badge";

const initialSecret = createSecret(3);

export default function Mastermind() {
    let [level, setLevel] = useState(3);
    let [lives, setLives] = useState(3);
    let [moves, setMoves] = useState([]);
    let [secret, setSecret] = useState(initialSecret);
    let [guess, setGuess] = useState(123);
    let [numberOfMoves, setNumberOfMoves] = useState(0);
    let maxNumberOfMoves = 10;

    const handleChange = (event) => {
        setGuess(Number(event.target.value));
    };
    const play = (event) => {
        if (guess === secret) {
            setLevel(level + 1);
            setMoves([]);
            setGuess(createSecret(level));
            setSecret(createSecret(level));
            setNumberOfMoves(0);
            return;
        }
        setNumberOfMoves(numberOfMoves+1);
        if (numberOfMoves > maxNumberOfMoves){
            // loses
        } else {
            setMoves([...moves, evaluateMove(secret,guess)]);
        }
    };

    return (
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Game Console"></CardHeader>
                <CardBody>
                    <FormGroup>
                        <Badge label="Level" value={level} bgColor="bg-success"></Badge>
                        <Badge label="Number of moves" value={numberOfMoves} bgColor="bg-warning"></Badge>
                        <Badge label="Lives" value={lives} bgColor="bg-danger"></Badge>
                        <InputText label="Guess"
                                   value={guess}
                                   htmlFor="guess"
                                   handleInput={handleChange}/>
                        <Button label="Play"
                                className="btn btn-success"
                                onClick={play}/>
                    </FormGroup>
                    <p></p>
                    <Table className="table table-responsive table-striped table-hover">
                        <TableHeader headerNames="Move No,Guess,Message,Perfect Match,Partial Match" />
                        <TableBody values={moves} attributes="guess,message,perfectMatch,partialMatch" keyAttribute="guess"></TableBody>
                    </Table>
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
