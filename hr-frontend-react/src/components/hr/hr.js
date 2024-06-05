import Container from "../common/container";
import Card from "../common/card";
import CardHeader from "../common/card-header";
import CardBody from "../common/card-body";
import {useEmployee, useEmployees, useHrDispatch} from "./provider/hr-provider";
import FormGroup from "../common/form-group";
import InputText from "../common/input-text";
import CheckBox from "../common/check-box";
import SelectBox from "../common/select-box";
import Photo from "../common/photo";
import Button from "../common/button";
import Table from "../common/table";
import TableHeader from "../common/table-header";
import TableBody from "../common/table-body";
import Badge from "../common/badge";

export default function Hr() {
    const employees = useEmployees();
    const employee = useEmployee();
    const hrDispatch = useHrDispatch();

    const findByIdentityNo = () => {
        fetch(`http://localhost:4001/employees/${employee.identityNo}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then( employee => hrDispatch({type: "EMPLOYEE_RECEIVED", employee}))
    }
    const updateEmployee = () => {
        fetch(`http://localhost:4001/employees`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(employee)
        }).then(res => res.json())
            .then( res => alert("Updated!"))
    }
    const fireEmployee = () => {
        fetch(`http://localhost:4001/employees/${employee.identityNo}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then( employee => hrDispatch({type: "EMPLOYEE_RECEIVED", employee}))

    }
    const hireEmployee = () => {
        fetch("http://localhost:4001/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(employee)
        }).then(res => res.json())
            .then( res => alert("Hired!"))
    }
    const retrieveAllEmployees = () => {
        fetch(`http://localhost:4001/employees`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then( employees => hrDispatch({type: "ALL_EMPLOYEES_RECEIVED", employees}))
    }
    return (
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Hr Console"></CardHeader>
                <CardBody>
                    <FormGroup>
                        <InputText value={employee.identityNo}
                                   label={"Identity No"}
                                   htmlFor={"identityNo"}
                                   handleInput={(event) => hrDispatch({"type": "INPUT_CHANGED", event})} />
                        <Button className={"btn-success"}
                                label={"Find"}
                                onClick={findByIdentityNo} />
                    </FormGroup>
                    <FormGroup>
                        <InputText value={employee.fullname}
                                   label={"Full Name"}
                                   htmlFor={"fullname"}
                                   handleInput={(event) => hrDispatch({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <InputText value={employee.salary}
                                   label={"Salary"}
                                   htmlFor={"salary"}
                                   handleInput={(event) => hrDispatch({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <InputText value={employee.iban}
                                   label={"Iban"}
                                   htmlFor={"iban"}
                                   handleInput={(event) => hrDispatch({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <InputText value={employee.birthYear}
                                   label={"Birth Year"}
                                   htmlFor={"birthYear"}
                                   handleInput={(event) => hrDispatch({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <CheckBox value={employee.fulltime}
                                   label={"Full Time?"}
                                  id={"fulltime"}
                                   handleChange={(event) => hrDispatch({"type": "INPUT_CHANGED", event})} />
                    </FormGroup>
                    <FormGroup>
                        <SelectBox value={employee.department}
                                  label={"Department"}
                                  id={"department"}
                                   options={["IT", "Sales", "Finance", "HR"]}
                                   handleChange={(event) => hrDispatch({"type": "INPUT_CHANGED", event})} />
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
            <Card>
                <CardHeader title={"Employees"}>
                    <Button className={"btn btn-success"}
                            label={"Retrieve All"}
                            onClick={retrieveAllEmployees}></Button>
                </CardHeader>
                <CardBody>
                    <Table className={"table table-striped table-hover"}>
                        <TableHeader headerNames={"No,IdentityNo,Full Name,Iban,Salary,Birth Year, Department, Full Time?,Photo"}></TableHeader>
                        <TableBody>
                            {
                                employees.map( (emp,index) =>
                                    <tr key={emp.identityNo}
                                        onClick={event => hrDispatch({type: "ROW_CLICKED", employee: emp})}>
                                        <td>{index+1}</td>
                                        <td>{emp.identityNo}</td>
                                        <td>{emp.fullname}</td>
                                        <td>{emp.iban}</td>
                                        <td>{emp.salary}</td>
                                        <td>{emp.birthYear}</td>
                                        <td><Badge bgColor={"bg-primary"} value={emp.department}/></td>
                                        <td><Badge bgColor={"bg-success"} value={emp.fulltime ? 'FULL TIME' : 'PART TIME'} /></td>
                                        <td><img alt={""} className={"img-thumbnail"} src={emp.photo}></img></td>
                                    </tr>
                                )
                            }
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </Container>
    );
}
