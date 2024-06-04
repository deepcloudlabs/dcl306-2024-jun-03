import React from "react";

export default function TableBody({children,values,attributes,key}) {
    return (
        <tbody>
        {
            values.map((value, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    {
                        attributes.split(",").map(
                            attribute => <td key={value[key]}>{value[attribute]}</td>
                        )
                    }
                </tr>
            ))
        }
        {children}
        </tbody>
    )
}
