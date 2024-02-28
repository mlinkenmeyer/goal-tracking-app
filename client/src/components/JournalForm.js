import React, { useState } from "react";

function JournalForm({ addEntry, journal, editEntry, setToggleJournalForm, setToggleEditEntry }) {

    const initialValuesEntry = {
        date: "",
        goal_id: "",
        journal_entry: ""
    }

    const [journalEntry, setJournalEntry] = useState(initialValuesEntry)

    const handleAddJournalEntry = (e) => {
        e.preventDefault()
        fetch('/journals', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(journalEntry)
        })
        .then((r) => r.json())
        .then((newEntry) => addEntry(newEntry))
        setJournalEntry(initialValuesEntry)
        setToggleJournalForm(false)
    }

    const handleEditJournalEntry = (e) => {
        e.preventDefault()
        fetch(`/journals/${journal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(journalEntry)
        })
        .then((r) => r.json())
        .then((updatedEntry) => editEntry(updatedEntry))
        setJournalEntry(initialValuesEntry)
        setToggleEditEntry(false)
    }

    const handleSubmitEntry = (e) => {
        e.preventDefault()
        journal ? handleEditJournalEntry(e) : handleAddJournalEntry(e) 
        // journal ? console.log("Edit") : console.log("Add")
        // console.log(journalEntry)
    }

    return (
        <div>
            <form onSubmit={handleSubmitEntry}>
                <label>Date</label>
                <input 
                    id="date" 
                    type="date"
                    value={journalEntry.date}
                    onChange={(e) => setJournalEntry({...journalEntry, ["date"]: e.target.value})}
                    />
                    <br />
                <label>Goal Id</label>
                <input 
                    id="goal-id" 
                    type="text"
                    value={journalEntry.goal_id}
                    onChange={(e) => setJournalEntry({...journalEntry, ["goal_id"]: e.target.value})}
                    />
                    <br />
                <label>Journal Entry</label>
                <input 
                    id="journal_entry" 
                    type="text"
                    value={journalEntry.journal_entry}
                    onChange={(e) => setJournalEntry({...journalEntry, ["journal_entry"]: e.target.value})}
                    />
                    <br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default JournalForm;