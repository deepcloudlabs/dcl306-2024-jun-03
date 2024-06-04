import Container from "../components/container";
import CardHeader from "../components/card-header";
import CardBody from "../components/card-body";
import Card from "../components/card";
import {Link} from "react-router-dom";

export default function PlayerWins(){
    return(
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Player Wins!"></CardHeader>
                <CardBody>
                    <Link to={"/"}>Would you like to play again?</Link>
                </CardBody>
            </Card>
        </Container>
    )
}
