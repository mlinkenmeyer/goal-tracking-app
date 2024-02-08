import React, { useEffect, useState } from "react"

function Journals() {

    const [journals, setJournals] = useState([])

    useEffect(() => {
        fetch("/journals")
        .then((r) => r.json())
        .then((data) => setJournals(data))
    }, [])

    console.log(journals)

    return (
        <div>
            <h4>Journals</h4>
            
        </div>
    )
}

export default Journals;