import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import ToastAlert from "../utilitis";
import { doc, getDoc } from "firebase/firestore";
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

      const uid = response.user.uid;
      // const userObj = {
      // email,
      // isActive : true,
      // type: "user"
      // }

      // await setDoc(doc(db, "users", uid), userObj)
      // console.log("User signed up successfully:", response.user);

      const data = await getDoc(doc(db, "users", uid));
      const userData = data.data();
      if (!userData.isActive) {
        ToastAlert({
          type: "error",
          message: "Your account is not active!",
        });
        return;
      }

      if (userData.type === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/blogs");
      }

      localStorage.setItem("userObj", JSON.stringify(userData));

      ToastAlert({
        type: "success",
        message: "User signed in successfully!",
      });
      // navigate("/blogs");
    } catch (error) {
      console.error("Error signing in:", error);
      ToastAlert({
        type: "error",
        message: error.message,
      });
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
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        marginTop: "50px",
        backgroundColor: "#2c3e50",
      }}
    >
      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(to bottom, #000000, #1a1a1a)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "white",
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
          Login
        </h1>
      </Box>

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
      <Link to={"/signup"}  style={{ textDecoration: "none", color: "wheat", fontWeight: "bold" }}> >Sign Up</Link>

      <Button variant="contained" color="success" onClick={loginHandler}>
        SIGN Up
      </Button>
    </div>
  );
};

export default Login;
