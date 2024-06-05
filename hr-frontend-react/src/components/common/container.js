export default function Container({children,className}) {
    if (!className)
        className = "container";
    return (
        <div className={className}>
            {children}
        </div>
    );
}
