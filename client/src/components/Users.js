import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import UserForm from "./UserForm";
import UserRow from "./UserRow";

function Users() {
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [azName, setAzName] = useState(true);
  const [azEmail, setAzEmail] = useState(true);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, []);

  const toggleUserForm = (e) => {
    setShowUserForm(!showUserForm);
  };

  const addUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
  };

  const editUser = (existingUser) => {
    const updatedUsers = users.map((user) => {
      if (user.id === existingUser.id) {
        return existingUser;
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
  };

  const deleteUser = (delUser) => {
    const updatedUsers = users.filter((user) => user.id !== delUser.id);
    setUsers(updatedUsers);
  };

  const handleNameSort = () => {
    if (azName === true) {
      const sortedUsers = [...users].sort((user1, user2) =>
        user2.name.localeCompare(user1.name)
      );
      setUsers(sortedUsers);
      setAzName(false);
      setAzEmail(false);
    } else if (azName === false) {
      const sortedUsers = [...users].sort((user1, user2) =>
        user1.name.localeCompare(user2.name)
      );
      setUsers(sortedUsers);
      setAzName(true);
      setAzEmail(true);
    }
  };

  const handleEmailSort = () => {
    if (azEmail === true) {
      const sortedUsers = [...users].sort((user1, user2) =>
        user2.email.localeCompare(user1.email)
      );
      setUsers(sortedUsers);
      setAzEmail(false);
      setAzName(false);
    } else if (azEmail === false) {
      const sortedUsers = [...users].sort((user1, user2) =>
        user1.email.localeCompare(user2.email)
      );
      setUsers(sortedUsers);
      setAzEmail(true);
      setAzName(true);
    }
  };

  return (
    <div>
      <h4>Users</h4>
      {showUserForm ? (
        <div>
          <button onClick={toggleUserForm}>Done Adding</button>
          <UserForm
            addUser={addUser}
            showUserForm={showUserForm}
            setShowUserForm={setShowUserForm}
          />
        </div>
      ) : (
        <button onClick={toggleUserForm}>Add New</button>
      )}
      <table>
        <tbody>
          <tr>
            <th style={{ textAlign: "left", width: "30%" }}>
              Name{" "}
              <FontAwesomeIcon icon={faSort} onClick={() => handleNameSort()} />
            </th>
            <th style={{ textAlign: "left", width: "45%" }}>
              Email <FontAwesomeIcon icon={faSort} onClick={handleEmailSort} />
            </th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {users ? (
            users.map((user, key) => (
              <UserRow
                key={key}
                user={user}
                showUserForm={showUserForm}
                setShowUserForm={setShowUserForm}
                editUser={editUser}
                deleteUser={deleteUser}
              />
            ))
          ) : (
            <p>Users Loading...</p>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
