import { useState } from "react";


function Time() {

    const[presentDate , setPresentDate] = useState(new Date());

    return(
        <>
        <p>{presentDate.toLocaleDateString()}</p>
        </>
    );
}
export default Time;