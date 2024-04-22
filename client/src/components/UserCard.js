import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserForm from "./UserForm";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";

export default function UserCard({
  user,
  showUserForm,
  setShowUserForm,
  editUser,
  deleteUser,
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditUser = (e) => {
    setShowEditForm(true);
  };

  const handleDelUser = (e) => {
    fetch(`/users/${user.id}`, {
      method: "DELETE",
    }).then(() => deleteUser(user));
  };

  const handleClose = () => {
    setShowEditForm(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <>
      <Modal
        id={user.id}
        open={showEditForm}
        onClose={handleClose}
        sx={{ border: "solid" }}
      >
        <Box sx={{ ...style }}>
          <UserForm
            user={user}
            showEditForm={showEditForm}
            setShowEditForm={setShowEditForm}
            editUser={editUser}
            deleteUser={deleteUser}
          />
        </Box>
      </Modal>
      <Card id={user.id} sx={{ width: 275, margin: "10px" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user.name[0]}
            </Avatar>
          }
          action={
            <>
              <IconButton onClick={handleEditUser} aria-label="settings">
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelUser} aria-label="settings">
                <DeleteIcon />
              </IconButton>
            </>
          }
          title={user.name}
          subheader={user.email}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {user.goals.length} Goals
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
