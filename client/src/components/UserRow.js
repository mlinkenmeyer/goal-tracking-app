import React, { useState } from "react";
import UserForm from "./UserForm";

function UserRow({
  user,
  showUserForm,
  setShowUserForm,
  editUser,
  deleteUser,
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditUser = (e) => {
    // setShowUserForm(!showUserForm)
    setShowEditForm(false);
    setShowEditForm(!showEditForm);
  };

  const handleDelUser = (e) => {
    fetch(`/users/${user.id}`, {
      method: "DELETE",
    }).then(() => deleteUser(user));
  };

  return (
    <>
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {showEditForm ? (
          <td>
            <button onClick={handleEditUser}>Cancel</button>
          </td>
        ) : (
          <td>
            <button onClick={handleEditUser}>Edit</button>
          </td>
        )}

        <td>
          <button onClick={(e) => handleDelUser(e)}>Delete</button>
        </td>
      </tr>
      {showEditForm ? (
        <tr>
          <td>
            <UserForm
              user={user}
              showEditForm={showEditForm}
              setShowEditForm={setShowEditForm}
              editUser={editUser}
              deleteUser={deleteUser}
            />
          </td>
        </tr>
      ) : null}
    </>
  );
}

export default UserRow;
