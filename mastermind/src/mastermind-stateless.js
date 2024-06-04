import Card from "./components/card";
import CardHeader from "./components/card-header";
import CardBody from "./components/card-body";
import FormGroup from "./components/form-group";
import Badge from "./components/badge";
import ProgressBar from "./components/progress-bar";
import InputText from "./components/input-text";
import Button from "./components/button";
import Table from "./components/table";
import TableHeader from "./components/table-header";
import TableBody from "./components/table-body";
import Container from "./components/container";
import {useContext, useEffect} from "react";
import {GameContext} from "./mastermind-provider";
import {useNavigate} from "react-router";

export default function MastermindStateless(){
    const {game, dispatchGame} = useContext(GameContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (game.status === "GAME_OVER")
            navigate("/loses");
        if (game.status === "PLAYER_WINS")
            navigate("/wins");
    });
    return(
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Game Console"></CardHeader>
                <CardBody>
                    <FormGroup>
                        <Badge label="Level" value={game.level} bgColor="bg-success"></Badge>
                        <Badge label="Number of moves" value={game.numberOfMoves} bgColor="bg-warning"></Badge>
                        <Badge label="Moves left" value={game.maxNumberOfMoves - game.numberOfMoves} bgColor="bg-danger"></Badge>
                        <Badge label="Max Number of Moves" value={game.maxNumberOfMoves} bgColor="bg-danger"></Badge>
                        <Badge label="Lives" value={game.lives} bgColor="bg-danger"></Badge>
                        <ProgressBar value={game.duration} max="60"></ProgressBar>
                        <InputText label="Guess"
                                   value={game.guess}
                                   htmlFor="guess"
                                   handleInput={ event =>dispatchGame({type: "GUESS_CHANGED", event})}/>
                        <Button label="Play"
                                className="btn btn-success"
                                onClick={ event => dispatchGame({type: "PLAY", event}) }/>
                    </FormGroup>
                    <p></p>
                    <Table className="table table-responsive table-striped table-hover">
                        <TableHeader headerNames="Move No,Guess,Message,Perfect Match,Partial Match"/>
                        <TableBody values={game.moves} attributes="guess,message,perfectMatch,partialMatch"
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
    );
}
