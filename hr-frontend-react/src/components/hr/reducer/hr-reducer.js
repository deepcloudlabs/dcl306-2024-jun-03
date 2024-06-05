export default function HrReducer(hr, action) {
    const newHr = {...hr};
    newHr.employee = {...hr.employee}
    switch (action.type) {
        case "INPUT_CHANGED":
            const name = action.event.target.name;
            if (name === "fulltime") {
                newHr.employee.fulltime = !newHr.employee.fulltime;
            } else {
                newHr.employee[name] = action.event.target.value;
            }
            break;
        case "PHOTO_CHANGED":
            newHr.employee.photo = action.fileData;
            break;
        case "ALL_EMPLOYEES_RECEIVED":
            newHr.employees = action.employees;
            break;
        case "EMPLOYEE_RECEIVED":
            for (let attr in action.employee) {
                if (newHr.employee.hasOwnProperty(attr)) {
                    newHr.employee[attr] = action.employee[attr];
                }
            }
            break;
        case "CLOSE_DIALOG":
            newHr.showDialog = false;
            break;
        case "OPEN_DIALOG":
            newHr.showDialog = true;
            newHr.employee = {...action.employee};
            break;
        case "ROW_CLICKED":
            for (let attr in action.employee) {
                if (newHr.employee.hasOwnProperty(attr)) {
                    newHr.employee[attr] = action.employee[attr];
                }
            }
            break;
        default:
            throw new Error("Unrecognized action type");
    }
    return newHr;
}
