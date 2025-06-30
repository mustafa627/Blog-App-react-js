import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import ToastAlert from "../utilitis";
import { doc, getDoc, setDoc } from "firebase/firestore";

const API_SECRET = `V0SLkUEoMVIrhOIcdwzBNEsseAE`;
const CLOUD_NAME = `dfeznwdqp`;

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const handleSubmit = async () => {
    // console.log("Email:", email);
    // console.log("Password:", password);
    // console.log("Full Name:", fullName);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // console.log("User created successfully:", res.user);
      localStorage.setItem("user", res.user.uid);
     
      const uid = res.user.uid;
      const userObj = {
        fullName,
        email,
        isActive: true,
        type: "user",
      };

      await setDoc(doc(db, "users", uid), userObj);
      // console.log("User signed up successfully:", response.user);

      const data = await getDoc(doc(db, "users", uid));
      const userData = data.data();
       localStorage.setItem("userObj", JSON.stringify(userData));
      if (data.exists()) {
        const userData = data.data();

        if (userData.type === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/blogs");
        }
      } else {
        console.error("No user data found.");
      }

      ToastAlert({
        type: "success",
        message: "User created successfully!",
      });
      // navigate("/blogs");
    } catch (e) {
      console.error("Error creating user:", e);
     ToastAlert({
        type: "error",
        message:  e.message,
      });
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
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        marginTop: "50px",
      }}
    >
      <Box sx={{ width: "100%", background: "linear-gradient(to bottom, #000000, #1a1a1a)", }}>
  <h1
    style={{
      textAlign: "center",
       
      color: "white",
      // height: "150px",  
      width: "100%",
      margin: 0,  
      borderBottomLeftRadius: "20px",
      borderBottomRightRadius: "20px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    Welcome !
  </h1>
</Box>
      <TextField
        id="outline-basic"
        label="Full Name"
        variant="standard"
        style={{ color: "white" }}
        onChange={(e) => setFullName(e.target.value)}
      />
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
      Already have an account? <Link to={"/"}>Login</Link>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        SIGN Up
      </Button>
    </div>
  );
};

export default Signup;
