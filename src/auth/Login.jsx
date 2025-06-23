import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import ToastAlert from "../utilitis";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginHandler = async () => {
    // console.log("Email:", email);
    // console.log("Password:", password);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", response.user.uid);
      //  console.log("User signed in successfully:", response.user);
      ToastAlert({
        type: "success",
        message: "User signed in successfully!",
      });
      navigate("/blogs");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        width: "300px",
        margin: "auto",
        backgroundColor: "",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h1>Login</h1>
      <TextField
        id="standard-basic"
        label="Email"
        variant="standard"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="outline-basic"
        label="Password"
        variant="standard"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to={"/signup"}>Sign Up</Link>

      <Button variant="contained" color="success" onClick={loginHandler}>
        SIGN Up
      </Button>
    </div>
  );
};

export default Login;
