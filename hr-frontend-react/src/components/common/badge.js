export default function Badge({label, value, bgColor}) {
    return (
        <h4>{label}:<span className={"badge ".concat(bgColor)}>{value}</span></h4>
    );
}
