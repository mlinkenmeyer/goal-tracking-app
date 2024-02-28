import React, { useState } from "react";

function UserForm({ user, addUser, editUser, showUserForm, setShowUserForm, setShowEditForm }) {

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    }
    const [userObj, setUserObj] = useState(user ? user : initialValues)

    const handleAddUser = (e) => {
        e.preventDefault()
        if (userObj.name.length > 0 && userObj.email.length > 0 && userObj.password === userObj.confirm_password) {
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: userObj.name,
                    email: userObj.email,
                    password: userObj.password
                })
            })
            .then((r) => r.json())
            .then((newUser) => {
                addUser(newUser)
                setUserObj(initialValues)
                setShowUserForm(false)
                }
            )
        } else {
            alert("All fields are required or passwords don't match")
        }
    }

    const handleEditUser = (e) => {
        e.preventDefault()
        if (userObj.name.length > 0 && userObj.email.length > 0 && userObj.password === userObj.confirm_password) {
            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: userObj.name,
                    email: userObj.email,
                    password: userObj.password
                })
            })
            .then((r) => r.json())
            .then((existingUser) => 
                {
                editUser(existingUser)
                setUserObj(initialValues)
                setShowEditForm(false)
                }
            )
        } else {
            alert("All fields are required or passwords don't match")
        }
    }

    const handleSubmitUser = (e) => {
        e.preventDefault()
        if (user) {
            handleEditUser(e)
        } else {
            handleAddUser(e)
        }
    }

    // const handleCancel = (e) => {
    //     setShowUserForm(false)
    // }

    return (
        <div>
            <form onSubmit={handleSubmitUser}>
                <label>Name</label>
                    <input 
                        type="text"
                        value={userObj.name}
                        onChange={(e) => setUserObj({...userObj,["name"]: e.target.value})}
                        />
                        <br/>
                <label>Email</label>
                    <input 
                        type="text"
                        value={userObj.email}
                        onChange={(e) => setUserObj({...userObj, ["email"]: e.target.value})}
                        />
                    <br/>
                <label>Password</label>
                    <input 
                        type="password"
                        value={userObj.password}
                        onChange={(e) => setUserObj({...userObj, ["password"]: e.target.value})}
                        />
                        <br/>
                <label>Confirm Password</label>
                    <input 
                        type="password"
                        value={userObj.confirm_password}
                        onChange={(e) => setUserObj({...userObj, ["confirm_password"]: e.target.value})}
                        />
                        <br/>
                <button>Submit</button><br/>
            </form>
            <br />
        </div>

    )
}

export default UserForm;