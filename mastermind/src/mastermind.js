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
import {useNavigate} from "react-router";

const initialSecret = createSecret(3);

export default function Mastermind() {
    //region state
    let [level, setLevel] = useState(3);
    let [lives, setLives] = useState(3);
    let [moves, setMoves] = useState([]);
    let [secret, setSecret] = useState(initialSecret);
    let [guess, setGuess] = useState(123);
    let [numberOfMoves, setNumberOfMoves] = useState(0);
    let [maxNumberOfMoves, setMaxNumberOfMoves] = useState(10 + 2 * level - 3);
    let [duration, setDuration] = useState(60);
    let navigate = useNavigate();
    //endregion

    const handleChange = (event) => {
        setGuess(Number(event.target.value));
    };
    const initializeGame = (message,level) => {
        setMaxNumberOfMoves(10 + 2 * level - 3);
        setDuration(60 + 10 * (level - 3));
        setNumberOfMoves(0);
        setMoves([new Move(secret, 0, 0, message)]);
        setLevel(level);
        setSecret(createSecret(level));
        localStorage.setItem("mastermind", JSON.stringify({level,setLives, moves,numberOfMoves,maxNumberOfMoves,secret,guess,duration}));
    }

    const play = () => {
        if (guess === secret) {
            if (level === 10) {
                navigate("/wins");
                return;
            }
            setLevel(level + 1);
            setLives(lives + 1);
            setDuration(60);
            initializeGame("You win this level.",level+1);
            return;
        }
        let newNumberOfMoves = numberOfMoves + 1;
        setNumberOfMoves(newNumberOfMoves);
        if (newNumberOfMoves >= maxNumberOfMoves) {
            if (lives === 1) {
                navigate("/loses");
                return;
            }
            setLives(lives - 1);
            initializeGame("You lose this level.",level);
        } else {
            setMoves([...moves, evaluateMove(secret, guess)]);
            localStorage.setItem("mastermind", JSON.stringify({level,setLives, moves,numberOfMoves,maxNumberOfMoves,secret,guess,duration}));
        }
    };

    useEffect(() => {
        let timer = setInterval(() => {
            if (duration <= 0) {
                if (lives === 1) {
                    navigate("/loses");
                    return;
                }
                setLives(lives - 1);
                initializeGame("You lose this level.",level);
                return;
            }
            setDuration(duration - 1);
            localStorage.setItem("mastermind", JSON.stringify({level,setLives, moves,numberOfMoves,maxNumberOfMoves,secret,guess,duration}));

        }, 1_000);
        return () => {
            clearInterval(timer);
        }
    });

    useEffect(() => {
        let mastermindState = localStorage.getItem("mastermind");
        if (mastermindState) {
            mastermindState = JSON.parse(mastermindState);
            setLevel(mastermindState.level);
            setSecret(mastermindState.secret);
            setDuration(mastermindState.duration);
            setLives(mastermindState.lives);
            setGuess(mastermindState.guess);
            setNumberOfMoves(mastermindState.numberOfMoves);
            setMaxNumberOfMoves(mastermindState.maxNumberOfMoves);
            setMoves(mastermindState.moves);
        } else {
            localStorage.setItem("mastermind", JSON.stringify({level,setLives, moves,numberOfMoves,maxNumberOfMoves,secret,guess,duration}));
        }
        return () => {
            localStorage.setItem("mastermind", JSON.stringify({level,setLives, moves,numberOfMoves,maxNumberOfMoves,secret,guess,duration}));
        }
    }, []);

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
