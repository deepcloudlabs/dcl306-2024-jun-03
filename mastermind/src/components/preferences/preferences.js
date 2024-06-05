import Card from "../common/card";
import CardHeader from "../common/card-header";
import CardBody from "../common/card-body";
import {useContext} from "react";
import {GameContext, PreferencesContext, StatisticsContext} from "../../mastermind-provider";

export default function Preferences() {
    const {prefs, dispatchPrefs} = useContext(PreferencesContext);

    return(
        <Card>
            <CardHeader title="Game Preferences"></CardHeader>
            <CardBody></CardBody>
        </Card>
    );
}
