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
        default:
            throw new Error("Unrecognized action type");
    }
    return newHr;
}
