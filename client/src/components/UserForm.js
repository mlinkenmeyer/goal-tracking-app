import React, { useState } from "react";
import { useFormik } from "formik";
import { Formik, Field, Form } from 'formik';
import * as yup from "yup";

function UserForm({ user, addUser, editUser, showUserForm, setShowUserForm, setShowEditForm }) {

    const initialValues = {
        name: user ? user.name : "",
        email: user ? user.email : "",
        password: "",
        confirm_password: ""
    }

    const handleAddUser = (values) => {
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password
                })
            })
            .then((r) => r.json())
            .then((newUser) => {
                addUser(newUser)
                setShowUserForm(false)
                }
            )
    }

    const handleEditUser = (values) => {
            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password
                })
            })
            .then((r) => r.json())
            .then((existingUser) => 
                {
                editUser(existingUser)
                setShowEditForm(false)
                }
            )
    }

    const formSchema = yup.object().shape({
        name: yup.string().required("First name is required"),
        email: yup.string().required("Must enter a valid email"),
        password: user ? "" : yup.string().required("Must enter a password with at least 6 characters & include at least 1 letter and 1 number"),
        confirm_password: user ? "" : yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Must match password")
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: values => {
            if (user) {
                handleEditUser(values)
            } else {
                handleAddUser(values)
            }
        }
      });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label>Name</label>
                     <input 
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        />
                        <p>{formik.errors.name}</p>
                        <br/>
                <label>Email</label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        />
                        <p>{formik.errors.email}</p>
                    <br/>
                <label>Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        />
                        <p>{formik.errors.password}</p>
                        <br/>
                <label>Confirm Password</label>
                    <input 
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        />
                        <p>{formik.errors.confirm_password}</p>
                        <br/>
                <button type="submit">Submit</button><br/>
            </form>
            <br />
        </div>

    )
}

export default UserForm;