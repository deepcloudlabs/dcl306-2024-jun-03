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
import Button from "../common/button";

export default function Hr() {
    const {hr, dispatchHr} = useContext(HrContext);
    const findByIdentityNo = () => {
        fetch(`http://localhost:4001/employees/${hr.identityNo}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then( employee => dispatchHr({type: "EMPLOYEE_RECEIVED", employee}))
    }
    const updateEmployee = () => {
        fetch(`http://localhost:4001/employees`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(hr)
        }).then(res => res.json())
            .then( res => alert("Updated!"))
    }
    const fireEmployee = () => {
        fetch(`http://localhost:4001/employees/${hr.identityNo}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then( employee => dispatchHr({type: "EMPLOYEE_RECEIVED", employee}))

    }
    const hireEmployee = () => {
        fetch("http://localhost:4001/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(hr)
        }).then(res => res.json())
            .then( res => alert("Hired!"))
    }
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
                        <Button className={"btn-success"}
                                label={"Find"}
                                onClick={findByIdentityNo} />
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
                                   options={["IT", "Sales", "Finance", "HR"]}
                                   handleChange={(event) => dispatchHr({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <Photo value={hr.photo}
                               label={"Photo"}
                               id={"photo"}
                               handleChange={(fileData) => dispatchHr({"type": "PHOTO_CHANGED", fileData})}></Photo>
                    </FormGroup>
                    <FormGroup>
                        <Button className={"btn-primary"}
                                label={"Hire Employee"}
                                onClick={hireEmployee} />
                        <Button className={"btn-info"}
                                label={"Update Employee"}
                                onClick={updateEmployee} />
                        <Button className={"btn-danger"}
                                label={"Fire Employee"}
                                onClick={fireEmployee} />
                    </FormGroup>
                </CardBody>
            </Card>
        </Container>
    );
}
