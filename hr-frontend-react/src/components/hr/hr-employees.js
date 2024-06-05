import Card from "../common/card";
import CardBody from "../common/card-body";
import Table from "../common/table";
import TableHeader from "../common/table-header";
import TableBody from "../common/table-body";
import {useEmployees, useHrDispatch} from "./provider/hr-provider";
import CardHeader from "../common/card-header";
import Button from "../common/button";
import Badge from "../common/badge";

export default function HrEmployees() {
    const employees = useEmployees();
    const hrDispatch = useHrDispatch();

    const retrieveAllEmployees = () => {
        fetch(`http://localhost:4001/employees`, {
            method: "GET", headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(employees => hrDispatch({type: "ALL_EMPLOYEES_RECEIVED", employees}))
    }
    const fireEmployee = (emp) => {
        fetch(`http://localhost:4001/employees/${emp.identityNo}`, {
            method: "DELETE", headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(employee => hrDispatch({type: "EMPLOYEE_RECEIVED", employee}))

    }

    function editEmployee(employee) {
        hrDispatch({type: "OPEN_DIALOG", employee});
    }

    return (<Card>
        <CardHeader title={"Employees"}>
            <Button className={"btn btn-success"}
                    label={"Retrieve All"}
                    onClick={retrieveAllEmployees}></Button>
        </CardHeader>
        <CardBody>
            <Table className={"table table-striped table-hover"}>
                <TableHeader
                    headerNames={"No,IdentityNo,Full Name,Iban,Salary,Birth Year, Department, Full Time?,Photo"}></TableHeader>
                <TableBody>
                    {employees.map((emp, index) => <tr key={emp.identityNo}
                                                       onClick={(e) => editEmployee(emp)}>
                        <td>{index + 1}</td>
                        <td>{emp.identityNo}</td>
                        <td>{emp.fullname}</td>
                        <td>{emp.iban}</td>
                        <td>{emp.salary}</td>
                        <td>{emp.birthYear}</td>
                        <td><Badge bgColor={"bg-primary"} value={emp.department}/></td>
                        <td><Badge bgColor={"bg-success"}
                                   value={emp.fulltime ? 'FULL TIME' : 'PART TIME'}/></td>
                        <td><img alt={""} className={"img-thumbnail"} src={emp.photo}></img></td>
                    </tr>)}
                </TableBody>
            </Table>
        </CardBody>
    </Card>);
}
