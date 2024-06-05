import Container from "../common/container";
import Card from "../common/card";
import CardHeader from "../common/card-header";
import CardBody from "../common/card-body";
import {useDepartments, useEmployee, useHrDispatch} from "./provider/hr-provider";
import FormGroup from "../common/form-group";
import InputText from "../common/input-text";
import CheckBox from "../common/check-box";
import SelectBox from "../common/select-box";
import Photo from "../common/photo";
import Button from "../common/button";

export default function Hr() {
    const employee = useEmployee();
    const hrDispatch = useHrDispatch();
    const departments = useDepartments();

    const findByIdentityNo = () => {
        fetch(`http://localhost:4001/employees/${employee.identityNo}`, {
            method: "GET", headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(employee => hrDispatch({type: "EMPLOYEE_RECEIVED", employee}))
    }
    const updateEmployee = () => {
        fetch(`http://localhost:4001/employees`, {
            method: "PUT", headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            }, body: JSON.stringify(employee)
        }).then(res => res.json())
            .then(res => alert("Updated!"))
    }
    const fireEmployee = (emp) => {
        fetch(`http://localhost:4001/employees/${emp.identityNo}`, {
            method: "DELETE", headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(employee => hrDispatch({type: "EMPLOYEE_RECEIVED", employee}))

    }
    const hireEmployee = () => {
        fetch("http://localhost:4001/employees", {
            method: "POST", headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            }, body: JSON.stringify(employee)
        }).then(res => res.json())
            .then(res => alert("Hired!"))
    }


    return (
            <Card>
                <CardHeader title="Hr Console"></CardHeader>
                <CardBody>
                    <FormGroup>
                        <InputText value={employee.identityNo}
                                   label={"Identity No"}
                                   htmlFor={"identityNo"}
                                   handleInput={(event) => hrDispatch({"type": "INPUT_CHANGED", event})}/>
                        <Button className={"btn-success"}
                                label={"Find"}
                                onClick={findByIdentityNo}/>
                    </FormGroup>
                    <FormGroup>
                        <InputText value={employee.fullname}
                                   label={"Full Name"}
                                   htmlFor={"fullname"}
                                   handleInput={(event) => hrDispatch({"type": "INPUT_CHANGED", event})}/>
                    </FormGroup>
                    <FormGroup>
                        <InputText value={employee.salary}
                                   label={"Salary"}
                                   htmlFor={"salary"}
                                   handleInput={(event) => hrDispatch({"type": "INPUT_CHANGED", event})}/>
                    </FormGroup>
                    <FormGroup>
                        <InputText value={employee.iban}
                                   label={"Iban"}
                                   htmlFor={"iban"}
                                   handleInput={(event) => hrDispatch({"type": "INPUT_CHANGED", event})}/>
                    </FormGroup>
                    <FormGroup>
                        <InputText value={employee.birthYear}
                                   label={"Birth Year"}
                                   htmlFor={"birthYear"}
                                   handleInput={(event) => hrDispatch({"type": "INPUT_CHANGED", event})}/>
                    </FormGroup>
                    <FormGroup>
                        <CheckBox value={employee.fulltime}
                                  label={"Full Time?"}
                                  id={"fulltime"}
                                  handleChange={(event) => hrDispatch({"type": "INPUT_CHANGED", event})}/>
                    </FormGroup>
                    <FormGroup>
                        <SelectBox value={employee.department}
                                   label={"Department"}
                                   id={"department"}
                                   options={departments}
                                   handleChange={(event) => hrDispatch({"type": "INPUT_CHANGED", event})}/>
                    </FormGroup>
                    <FormGroup>
                        <Photo value={employee.photo}
                               label={"Photo"}
                               id={"photo"}
                               handleChange={(fileData) => hrDispatch({"type": "PHOTO_CHANGED", fileData})}></Photo>
                    </FormGroup>
                    <FormGroup>
                        <Button className={"btn-primary"}
                                label={"Hire Employee"}
                                onClick={hireEmployee}/>
                        <Button className={"btn-info"}
                                label={"Update Employee"}
                                onClick={updateEmployee}/>
                        <Button className={"btn-danger"}
                                label={"Fire Employee"}
                                onClick={() => fireEmployee(employee)}/>
                    </FormGroup>
                </CardBody>
            </Card>
    );
}
