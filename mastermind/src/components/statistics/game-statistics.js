import Card from "../common/card";
import CardHeader from "../common/card-header";
import CardBody from "../common/card-body";
import {useContext} from "react";
import {GameContext, StatisticsContext} from "../../mastermind-provider";

export default function GameStatistics() {
    const {stats, dispatchStats} = useContext(StatisticsContext);
    const {game, dispatchGame} = useContext(GameContext);

    return(
        <Card>
            <CardHeader title="Game Statistics"></CardHeader>
            <CardBody></CardBody>
        </Card>
    );
}
