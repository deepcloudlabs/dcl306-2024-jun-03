import Container from "../common/container";
import Card from "../common/card";
import CardHeader from "../common/card-header";
import CardBody from "../common/card-body";
import {useContext} from "react";
import {HrContext} from "./provider/hr-provider";
import FormGroup from "../common/form-group";
import InputText from "../common/input-text";
import CheckBox from "../common/check-box";
import SelectBox from "../common/select-box";
import Photo from "../common/photo";

export default function Hr() {
    const {hr, dispatchHr} = useContext(HrContext);

    return (
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Hr Console"></CardHeader>
                <CardBody>
                    <FormGroup>
                        <InputText value={hr.identityNo}
                                   label={"Identity No"}
                                   htmlFor={"identityNo"}
                                   handleInput={(event) => dispatchHr({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <InputText value={hr.fullname}
                                   label={"Full Name"}
                                   htmlFor={"fullname"}
                                   handleInput={(event) => dispatchHr({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <InputText value={hr.salary}
                                   label={"Salary"}
                                   htmlFor={"salary"}
                                   handleInput={(event) => dispatchHr({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <InputText value={hr.iban}
                                   label={"Iban"}
                                   htmlFor={"iban"}
                                   handleInput={(event) => dispatchHr({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <InputText value={hr.birthYear}
                                   label={"Birth Year"}
                                   htmlFor={"birthYear"}
                                   handleInput={(event) => dispatchHr({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <CheckBox value={hr.fulltime}
                                   label={"Full Time?"}
                                  id={"fulltime"}
                                   handleChange={(event) => dispatchHr({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <SelectBox value={hr.department}
                                  label={"Department"}
                                  id={"department"}
                                   options={["IT", "SALES", "FINANCE", "HR"]}
                                   handleChange={(event) => dispatchHr({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <Photo value={hr.photo}
                               label={"Photo"}
                               id={"photo"}
                                handleChange={(event) => dispatchHr({"type": "INPUT_CHANGED", event})}></Photo>
                    </FormGroup>
                </CardBody>
            </Card>
        </Container>
    );
}
