import React, { useState } from "react";
import JournalForm from "./JournalForm"

function JournalEntry({ journal, editEntry, removeEntry }) {

    const [toggleEditEntry, setToggleEditEntry] = useState(false)

    const handleEditEntry = (e) => {
        setToggleEditEntry(true)
    }

    const handleCancelEdit = (e) => {
        setToggleEditEntry(false)
    }

    const handleDelEntry = (e) => {
        fetch(`/journals/${journal.id}`, {
            method: "DELETE"
        })
        .then(() => {removeEntry(journal)})
    }

    const date = new Date(journal.date)
    const month = date.getMonth()+1
    const cleanDate = date.getFullYear()+"-"+(month < 10 ? "0" + month : month)+"-"+(date.getDate() < 10 ? "0" + date.getDate() : date.getDate())

    return (
        <tr>
            <td>
                <strong>
                    {journal.id} | Date: {cleanDate} | Goal: {journal.goal ? journal.goal.title : journal.goal_id} ({journal.goal_id})
                </strong>
                <br />
                {journal.journal_entry}<br />
                <button onClick={(e) => handleEditEntry(e)}>Edit</button>
                <button onClick={(e) => handleDelEntry(e)}>Delete</button> 
                {toggleEditEntry ?
                (<>
                    <JournalForm journal={journal} editEntry={editEntry} setToggleEditEntry={setToggleEditEntry} />
                    <button onClick={(e) => handleCancelEdit(e)}>Cancel</button>
                </>)
                :
                null}
            </td>
        </tr>
    )
}

export default JournalEntry;