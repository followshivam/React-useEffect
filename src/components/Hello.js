import React from "react";

function Hello() {

    React.useEffect(() => {
        console.log("Hello rendered");
        return () => {
         console.log("Hello unmounted");
        };
     }, []);


    return (
        <div>
         <h1> Hello </h1>
        </div>
    )
}

export default Hello;