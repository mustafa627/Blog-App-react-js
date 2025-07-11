import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ToastAlert from "../utilitis";
const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(docSnap.data().title);
        setSubject(docSnap.data().subject);
        setDesc(docSnap.data().desc);
        setIsPrivate(data.isPrivate);
      } else {
        ToastAlert({ type: "error", message: "Blog not found" });
        navigate("/");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "blogs", id);
      await updateDoc(docRef, {
        title,
        subject,
        desc,
        isPrivate,
      });
      ToastAlert({ type: "success", message: "Blog updated!" });
      navigate("/myblogs");
    } catch (err) {
      ToastAlert({ type: "error", message: "Update failed!" });
      console.error("Error updating blog: ", err);
    }
  };

  return (
    <>
      {" "}
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIcon /> Back
        </Button>
      </Box>
      <Stack
        spacing={2}
        sx={{
          width: "100%",
          margin: "auto",
          mt: 2,
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#1b2639",
          color: "#fff",
          // width: "100%",
          maxWidth: {
            xs: "60%",
            md: "60%",
            sm: "70%",
          },
        }}
      >
        <Typography variant="h4" align="center">
          Edit Blog{" "}
        </Typography>
        <TextField
          InputProps={{
            style: { color: "white", borderRadius: "20px" },
          }}
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          InputProps={{
            style: { color: "white", borderRadius: "20px" },
          }}
        />
        <TextField
          label="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          multiline
          minRows={3}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          <Typography sx={{ color: "grey", fontSize: "20px" }} variant="p">
            Private ?
          </Typography>
        </label>
        <Button variant="contained" onClick={handleUpdate}>
          Update Blog
        </Button>
      </Stack>
    </>
  );
};

export default EditBlog;
