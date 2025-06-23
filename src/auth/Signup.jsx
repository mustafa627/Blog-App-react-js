import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
 import {auth} from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import ToastAlert from "../utilitis";

const API_SECRET = `V0SLkUEoMVIrhOIcdwzBNEsseAE`;
const CLOUD_NAME = `dfeznwdqp`

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async () => {
    // console.log("Email:", email);
    // console.log("Password:", password);
    console.log("Full Name:", fullName);
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully:", res.user);
      localStorage.setItem("user", res.user.uid);
      ToastAlert({
        type: "success",
        message: "User created successfully!",
      })
      navigate("/blogs");
    }catch(e){
      toast.error("Error creating user: " + e.message);
      console.error("Error creating user:", e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        width: "300px",
        margin: "auto",
        backgroundColor: "",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Welcome !</h1>
      <TextField
        id="outline-basic"
        label="Full Name"
        variant="standard"
        style={{ color: "white" }}
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextField id="standard-basic" label="Email" variant="standard" 
      onChange={(e) => setEmail(e.target.value)}/>
      <TextField id="outline-basic" label="Password" variant="standard" 
      onChange={(e) => setPassword(e.target.value)}/>
      Already have an account? <Link to={"/"}>Login</Link>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        SIGN Up
      </Button>
    </div>
  );
};

export default Signup;
