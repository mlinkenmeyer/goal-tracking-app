import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UserCard from "./UserCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Users() {
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [azName, setAzName] = useState(true);
  const [azEmail, setAzEmail] = useState(true);
  const [resetUsers, setResetUsers] = useState(false);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, [resetUsers]);

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

  const handleResetUsers = () => {
    fetch("/reset_users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({}),
    }).then((r) => {
      if (r.ok) {
        console.log("update");
        setResetUsers(!resetUsers);
      }
    });
  };

  return (
    <div>
      <Box sx={{ margin: "30px" }}>
        <Typography component="h1" variant="h4">
          Users
        </Typography>
        <Button
          sx={{ margin: "10px", backgroundColor: "purple" }}
          variant="contained"
          onClick={handleResetUsers}
        >
          Reset Users
        </Button>
        <br />
        {showUserForm ? (
          <div>
            <Button
              sx={{ margin: "10px", backgroundColor: "blue" }}
              variant="contained"
              onClick={toggleUserForm}
            >
              Done Adding
            </Button>
            <UserForm
              addUser={addUser}
              showUserForm={showUserForm}
              setShowUserForm={setShowUserForm}
            />
          </div>
        ) : (
          <Button
            sx={{ margin: "10px", backgroundColor: "blue" }}
            variant="contained"
            onClick={toggleUserForm}
          >
            Add New
          </Button>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            marginLeft: "10px"
          }}
        >
          Note: Deleting users will remove goals and journals associated with that
          user
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {users ? (
            users.map((user, key) => (
              <UserCard
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
        </Box>
      </Box>
    </div>
  );
}

export default Users;