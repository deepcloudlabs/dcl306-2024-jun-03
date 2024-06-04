import React from "react";

// this is a stateless component
export default  function TableHeader(props) {
    return (
        <thead>
        <tr>
            {
                props.headerNames.split(",").map( headerName => (
                    <th>{headerName}</th>
                ))
            }
        </tr>
        </thead>
    );
}
