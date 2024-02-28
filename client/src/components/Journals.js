import React, { useEffect, useState } from "react"
import JournalEntry from "./JournalEntry"
import JournalForm from "./JournalForm"
import Search from "./Search"
import JournalFilter from "./JournalFilter"

function Journals() {

    const [journals, setJournals] = useState([])
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("idAscend")
    const [toggleJournalForm, setToggleJournalForm] = useState(false)

    useEffect(() => {
        fetch("/journals")
        .then((r) => r.json())
        .then((data) => setJournals(data))
    }, [])

    const handleCreateJournal = () => {
        setToggleJournalForm(!toggleJournalForm)
    }

    const addEntry = (newEntry) => {
        setJournals([...journals, newEntry])
    }

    const editEntry = (updatedEntry) => {
        const updateEntries = journals.map((journal) => journal.id === updatedEntry.id ? updatedEntry : journal)
        setJournals(updateEntries)
    }

    const removeEntry = (delEntry) => {
        const updateEntries = journals.filter((journal) => 
            journal.id !== delEntry.id
        )
        setJournals(updateEntries)
    }

    const sortedEntries = (sortBy) => {
        setSortBy(sortBy)
    }

    const searchedEntries = journals.filter((journal) =>
            journal.journal_entry.toLowerCase().includes(search.toLowerCase())
        )
        .sort((entry1, entry2) => {
            if (sortBy === "idAscent") {
                return entry1.id - entry2.id
            }  if (sortBy === "idDescent") {
                return entry2.id - entry1.id
            // }  if (sortBy === "old-new") {
            //     return entry1.date - entry2.date
            // }  if (sortBy === "new-old") {
            //     return entry2.date - entry1.date
            }  if (sortBy === "goal-id") {
                return entry1.goal_id - entry2.goal_id
            }
        })


    return (
        <div>
            <h4>Journals</h4>
            <div style={{ paddingBottom: "20px" }}>
                <Search 
                    search={search}
                    setSearch={setSearch}
                    />
            </div>
            <div>
                <JournalFilter 
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortedEntries={sortedEntries}
                    />
                <br />
            </div>
            {toggleJournalForm ?
                (<>
                    <button onClick={handleCreateJournal}>Done Adding</button>
                    <JournalForm addEntry={addEntry} setToggleJournalForm={setToggleJournalForm} />
                </>)
                :
                (<button onClick={handleCreateJournal}>Create Journal</button>)
            }
            <table>
                <tbody>
                    {journals ? 
                    searchedEntries.map((journal, key) => <JournalEntry key={key} journal={journal} 
                    editEntry={editEntry}
                    removeEntry={removeEntry} />)
                    :
                    null
                    }
                </tbody>
            </table>

            
            
        </div>
    )
}

export default Journals;