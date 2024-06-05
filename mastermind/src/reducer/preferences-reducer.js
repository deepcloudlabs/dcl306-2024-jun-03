export default function PreferencesReducer(prefs, action) {
    const newPrefs = {...prefs};
    switch (action.type) {
        case "CLICKED":
            break;
        default:
            throw new Error("Unrecognized action type");
    }
    return newPrefs;
}
