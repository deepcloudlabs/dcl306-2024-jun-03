import Container from "./components/container";
import CardHeader from "./components/card-header";
import Card from "./components/card";
import CardBody from "./components/card-body";

export default function Mastermind() {
    return(
        <Container>
            <Card>
                <CardHeader title="Game Console"></CardHeader>
                <CardBody></CardBody>
            </Card>
        </Container>
    )
}
