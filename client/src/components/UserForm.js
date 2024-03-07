import React, { useState } from "react";
import { useFormik } from "formik";
import { Formik, Field, Form } from 'formik';
import * as yup from "yup";

function UserForm({ user, addUser, editUser, showUserForm, setShowUserForm, setShowEditForm }) {

    const formSchema = yup.object().shape({
        name: yup.string().required("First name is required"),
        email: yup.string().required("Must enter a valid email"),
        password: yup.string().required("Must enter a password with at least 6 characters & include at least 1 letter and 1 number"),
        confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Must match password")
      });
    
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const userData = {
                        name: values.name,
                        email: values.email,
                        password: values.password
                        }    
            fetch("/users", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData, null, 2),
            })
            .then((r) => r.json())
            .then((newUser) => {
                addUser(newUser)
                setShowUserForm(false)
                }
            )
    }});
    
    // const initialValues = {
    //     name: "",
    //     email: "",
    //     password: "",
    //     confirm_password: ""
    // }
    // const [userObj, setUserObj] = useState(user ? user : formik.initialValues)

    // const handleAddUser = (e) => {
    //     e.preventDefault()
    //     if (userObj.name.length > 0 && userObj.email.length > 0 && userObj.password === userObj.confirm_password) {
    //         fetch("/users", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json"
    //             },
    //             body: JSON.stringify({
    //                 name: userObj.name,
    //                 email: userObj.email,
    //                 password: userObj.password
    //             })
    //         })
    //         .then((r) => r.json())
    //         .then((newUser) => {
    //             addUser(newUser)
    //             setUserObj(formik.initialValues)
    //             setShowUserForm(false)
    //             }
    //         )
    //     } else {
    //         alert("All fields are required or passwords don't match")
    //     }
    // }

    // const handleEditUser = (e) => {
    //     e.preventDefault()
    //     if (userObj.name.length > 0 && userObj.email.length > 0 && userObj.password === userObj.confirm_password) {
    //         fetch(`/users/${user.id}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json"
    //             },
    //             body: JSON.stringify({
    //                 name: userObj.name,
    //                 email: userObj.email,
    //                 password: userObj.password
    //             })
    //         })
    //         .then((r) => r.json())
    //         .then((existingUser) => 
    //             {
    //             editUser(existingUser)
    //             setUserObj(formik.initialValues)
    //             setShowEditForm(false)
    //             }
    //         )
    //     } else {
    //         alert("All fields are required or passwords don't match")
    //     }
    // }

    // const handleSubmitUser = (e) => {
    //     e.preventDefault()
    //     if (user) {
    //         handleEditUser(e)
    //     } else {
    //         handleAddUser(e)
    //     }
    // }

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
                        <br/>
                <label>Email</label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        />
                    <br/>
                <label>Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        />
                        <br/>
                <label>Confirm Password</label>
                    <input 
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        />
                        <br/>
                <button>Submit</button><br/>
            </form>
            <br />
        </div>

    )
}

export default UserForm;