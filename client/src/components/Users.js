import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UserRow from "./UserRow"


function Users() {

    const [users, setUsers] = useState([])
    const [showUserForm, setShowUserForm] = useState(false)

    useEffect(() => {
        fetch("/users")
        .then((r) => r.json())
        .then((data) => setUsers(data))
    }, [])

    console.log(users)

    const displayUsers = users.map((user) => <p key={user.id}>{user.name} | {user.email}</p>)

    const toggleUserForm = (e) => {
        console.log("Add user")
        setShowUserForm(!showUserForm)
    }

    const addUser = (newUser) => {
        const updatedUsers = [...users, newUser]
        setUsers(updatedUsers)
    }

    const deleteUser = (delUser) => {
        const updatedUsers = users.filter((user) => user.id !== delUser.id)
        setUsers(updatedUsers)
    }

    return (

        <div>
            <h4>Registered users:</h4>
            {showUserForm ? 
                (
                <>
                    <UserForm
                        addUser={addUser}
                        deleteUser={deleteUser} />
                    <button onClick={toggleUserForm}>Cancel</button>
                </>
                )
                : 
                <button onClick={toggleUserForm}>Add New</button>
            }
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {users ? users.map((user, key) =>
                <UserRow 
                    key={key}
                    user={user}
                    showUserForm={showUserForm}
                    setShowUserForm={setShowUserForm}
                    deleteUser={deleteUser}
                    />
                )
                : <p>Users Loading...</p>
                }
            </table>
        </div>
    )

}

export default Users;