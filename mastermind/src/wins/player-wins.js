import Container from "../components/container";
import CardHeader from "../components/card-header";
import CardBody from "../components/card-body";
import Card from "../components/card";

export default function PlayerWins(){
    return(
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Player Wins!"></CardHeader>
                <CardBody>
                    Would you like to play again?
                </CardBody>
            </Card>
        </Container>
    )
}
