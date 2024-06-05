export default function StatisticsReducer(stats, action) {
    const newStats = {...stats};
    switch (action.type) {
        case "CLICKED":
            break;
        default:
            throw new Error("Unrecognized action type");
    }
    return newStats;
}
