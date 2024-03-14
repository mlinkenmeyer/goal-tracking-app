import React, { useState } from "react";
import { useFormik } from "formik";
import { Formik, Field, Form } from 'formik';
import * as yup from "yup";

function JournalForm({ addEntry, journal, editEntry, setToggleJournalForm, setToggleEditEntry }) {

    const today = new Date()
    const todayMonth = today.getMonth()+1
    const todayCleanDate = today.getFullYear()+"-"+(todayMonth < 10 ? "0" + todayMonth : todayMonth)+"-"+(today.getDate() < 10 ? "0" + today.getDate() : today.getDate())

    const initialValuesEntry = {
        date: journal ? journal.date : todayCleanDate,
        goal_id: journal ? journal.goal_id : "",
        journal_entry: journal ? journal.journal_entry : ""
    }

    const handleAddJournalEntry = (values) => {
        console.log(values)
        fetch('/journals', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(values)
        })
        .then((r) => r.json())
        .then((newEntry) => addEntry(newEntry))
        setToggleJournalForm(false)
    }

    const handleEditJournalEntry = (values) => {
        fetch(`/journals/${journal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(values)
        })
        .then((r) => r.json())
        .then((updatedEntry) => editEntry(updatedEntry))
        setToggleEditEntry(false)
    }

    const formSchema = yup.object().shape({
        date: yup.string().required("Must be a valid date"),
        goal_id: yup.string().required("Must enter a valid goal ID"),
        journal_entry: yup.string().required("Entries must be within alotted amount of characters"),
    });

    const formik = useFormik({
        initialValues: initialValuesEntry,
        validationSchema: formSchema,
        onSubmit: values => {
            journal ? handleEditJournalEntry(values) : handleAddJournalEntry(values) 
        }
    })

    const date = new Date(formik.values.date)
    const month = date.getMonth()+1
    const cleanDate = date.getFullYear()+"-"+(month < 10 ? "0" + month : month)+"-"+(date.getDate() < 10 ? "0" + date.getDate() : date.getDate())

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label>Date</label>
                <input 
                    id="date" 
                    type="date"
                    name="date"
                    // value={journal ? cleanDate : todayCleanDate}
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    />
                    <br />
                <label>Goal Id</label>
                <input 
                    id="goal_id" 
                    type="text"
                    name="goal_id"
                    value={formik.values.goal_id}
                    onChange={formik.handleChange}
                    />
                    <br />
                <label>Journal Entry</label>
                <input 
                    id="journal_entry" 
                    type="text"
                    name="journal_entry"
                    value={formik.values.journal_entry}
                    onChange={formik.handleChange}
                    />
                    <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default JournalForm;