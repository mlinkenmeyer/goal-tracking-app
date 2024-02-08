import React, { useState } from "react";

function UserForm({ user, addUser }) {

    const [userObj, setUserObj] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    console.log(userObj)

    const handleSubmitUser = (e) => {
        e.preventDefault()
        if (userObj.name.length > 0 && userObj.email.length > 0 && userObj.password === userObj.confirm_password) {
            console.log("submitted form")
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(userObj)
            })
            .then((r) => r.json())
            .then((newUser) => addUser(newUser))
        } else {
            alert("All fields are required or passwords don't match")
        }

    }

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
                <button>Submit</button>
            </form>
            <br />
        </div>

    )
}

export default UserForm;