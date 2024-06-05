export default function HrReducer(hr, action) {
    const newHr = {...hr};
    switch (action.type) {
        case "INPUT_CHANGED":
            const name = action.event.target.name;
            if (name === "fulltime") {
                newHr.fulltime = !newHr.fulltime;
            } else {
                newHr[name] = action.event.target.value;
            }
            break;
        case "PHOTO_CHANGED":
            newHr.photo = action.fileData;
            break;
        case "EMPLOYEE_RECEIVED":
            for (let attr in action.employee) {
                if (newHr.hasOwnProperty(attr)) {
                    newHr[attr] = action.employee[attr];
                }
            }
            break;
        default:
            throw new Error("Unrecognized action type");
    }
    return newHr;
}
