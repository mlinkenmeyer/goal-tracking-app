import React, { useState } from "react";
import { useFormik } from "formik";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function UserForm({
  user,
  addUser,
  editUser,
  showUserForm,
  setShowUserForm,
  setShowEditForm,
  showEditForm,
}) {
  const initialValues = {
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
    confirm_password: "",
  };

  const handleAddUser = (values) => {
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    })
      .then((r) => r.json())
      .then((newUser) => {
        addUser(newUser);
        setShowUserForm(false);
      });
  };

  const handleEditUser = (values) => {
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    })
      .then((r) => r.json())
      .then((existingUser) => {
        editUser(existingUser);
        setShowEditForm(false);
      });
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("First name is required"),
    email: yup.string().required("Must enter a valid email"),
    password: user
      ? ""
      : yup
          .string()
          .required(
            "Must enter a password with at least 6 characters & include at least 1 letter and 1 number"
          ),
    confirm_password: user
      ? ""
      : yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match")
          .required("Must match password"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      if (user) {
        handleEditUser(values);
      } else {
        handleAddUser(values);
      }
    },
  });

  const defaultTheme = createTheme();

  const handleCancel = () => {
    if (user) {
      setShowEditForm(false);
    } else {
      setShowUserForm(false);
    }
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm" sx={{ margin: "auto" }}>
          <CssBaseline />
          <Box
            sx={{
              marginBottom: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {user ? (
              <IconButton
                sx={{ alignItems: "right" }}
                onClick={(e) => handleCancel(e)}
                aria-label="settings"
              >
                <CloseIcon />
              </IconButton>
            ) : null}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {user ? "Edit User" : "Sign Up"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid
                container
                rowSpacing={2}
                spacing={0}
                columnSpacing={4}
                sx={{ width: "100%", margin: "auto" }}
              >
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    // id={user ? user.name : "name"}
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    // id={user ? user.email : "email"}
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="password"
                    id={user ? user.password : "password"}
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="password"
                    id={user ? user.password : "confirm_password"}
                    name="confirm_password"
                    label="Confirm Password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default UserForm;
