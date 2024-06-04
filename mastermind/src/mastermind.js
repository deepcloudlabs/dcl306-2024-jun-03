import Container from "./components/container";
import CardHeader from "./components/card-header";
import Card from "./components/card";
import CardBody from "./components/card-body";
import {useEffect, useState} from "react";
import {createSecret, evaluateMove, Move} from "./utility";
import FormGroup from "./components/form-group";
import InputText from "./components/input-text";
import Button from "./components/button";
import Table from "./components/table";
import TableHeader from "./components/table-header";
import TableBody from "./components/table-body";
import Badge from "./components/badge";
import ProgressBar from "./components/progress-bar";

const initialSecret = createSecret(3);

export default function Mastermind() {
    let [level, setLevel] = useState(3);
    let [lives, setLives] = useState(3);
    let [moves, setMoves] = useState([]);
    let [secret, setSecret] = useState(initialSecret);
    let [guess, setGuess] = useState(123);
    let [numberOfMoves, setNumberOfMoves] = useState(0);
    let [maxNumberOfMoves, setMaxNumberOfMoves] = useState(10 + 2 * level - 3);
    let [duration, setDuration] = useState(60);

    const handleChange = (event) => {
        setGuess(Number(event.target.value));
    };
    const initializeGame = (message) => {
        setMaxNumberOfMoves(10 + 2 * level - 3);
        setDuration(60 + 10 * (level - 3));
        setNumberOfMoves(0);
        setMoves([new Move(secret, 0, 0, message)]);
        setSecret(createSecret(level));
    }

    const play = (event) => {
        if (guess === secret) {
            if (level === 10) {
                // end of game, player wins the game!
                return;
            }
            setLevel(level + 1);
            setLives(lives + 1);
            setDuration(60)
            initializeGame("You win this level.");
            return;
        }
        let newNumberOfMoves = numberOfMoves + 1;
        setNumberOfMoves(newNumberOfMoves);
        if (newNumberOfMoves >= maxNumberOfMoves) {
            if (lives === 1) {
                // end of game, player loses the game!
                return;
            }
            setLives(lives - 1);
            initializeGame("You lose this level.");
        } else {
            setMoves([...moves, evaluateMove(secret, guess)]);
        }
    };
    useEffect(() => {
        let timer = setInterval(() => {
            if (duration <= 0) {
                if (lives === 1) {
                    // end of game, player loses the game!
                    return;
                }
                setLives(lives - 1);
                initializeGame("You lose this level.");
                return;
            }
            setDuration(duration - 1);

        }, 1_000);
        return () => {
            clearInterval(timer);
        }
    });


    return (
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Game Console"></CardHeader>
                <CardBody>
                    <FormGroup>
                        <Badge label="Level" value={level} bgColor="bg-success"></Badge>
                        <Badge label="Number of moves" value={numberOfMoves} bgColor="bg-warning"></Badge>
                        <Badge label="Moves left" value={maxNumberOfMoves - numberOfMoves} bgColor="bg-danger"></Badge>
                        <Badge label="Max Number of Moves" value={maxNumberOfMoves} bgColor="bg-danger"></Badge>
                        <Badge label="Lives" value={lives} bgColor="bg-danger"></Badge>
                        <ProgressBar value={duration} max="60"></ProgressBar>
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
                        <TableHeader headerNames="Move No,Guess,Message,Perfect Match,Partial Match"/>
                        <TableBody values={moves} attributes="guess,message,perfectMatch,partialMatch"
                                   keyAttribute="guess"></TableBody>
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
