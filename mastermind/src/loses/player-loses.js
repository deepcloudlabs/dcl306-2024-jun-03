import Container from "../components/common/container";
import CardHeader from "../components/common/card-header";
import CardBody from "../components/common/card-body";
import Card from "../components/common/card";
import {Link} from "react-router-dom";

export default function PlayerLoses(){
    return(
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Player Loses!"></CardHeader>
                <CardBody>
                    <Link to={"/"}>Would you like to play again?</Link>
                </CardBody>
            </Card>
        </Container>
    )
}
