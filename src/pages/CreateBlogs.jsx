 

import Navbar from "../CMP/Navbar";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ToastAlert from "../utilitis";
import axios from "axios";

const CLOUD_NAME = `dfeznwdqp`;

const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [blogPrivate, setBlogPrivate] = useState(false);
  const [blogImage, setBlogImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const inputRef = useRef();

  const fileHandler = () => inputRef.current.click();

  const addBlogs = async () => {
    try {
      if (!title || !subject || !desc) {
        ToastAlert({
          type: "error",
          message: "Please fill all fields!",
        });
        return;
      }

      let imageUrl = "";

      if (blogImage) {
        const formData = new FormData();
        formData.append("file", blogImage);
        formData.append("upload_preset", "mustafa");

        const resImage = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
          formData
        );
        imageUrl = resImage.data.secure_url;
      }

      const obj = {
        title,
        subject,
        desc,
        isPrivate: blogPrivate,
        image: imageUrl,
        createdAt: new Date(),
        userId: localStorage.getItem("user"),
        isActive: true,
      };

      await addDoc(collection(db, "blogs"), obj);

      // Reset fields
      setTitle("");
      setSubject("");
      setDesc("");
      setBlogPrivate(false);
      setBlogImage(null);
      setPreviewImage(null);

      ToastAlert({
        type: "success",
        message: "Blog successfully created!",
      });
    } catch (e) {
      console.log("error", e.message);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 5, px: 2 }}>
        <Paper
          elevation={3}
          sx={{
            maxWidth: 600,
            margin: "auto",
            p: 4,
            borderRadius: 4,
            background: "#fdfdfd",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Create a New Blog
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Subject"
              variant="outlined"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={blogPrivate}
                  onChange={(e) => setBlogPrivate(e.target.checked)}
                />
              }
              label="Make this blog Private"
            />

            <Box
              sx={{
                border: "2px dashed gray",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={fileHandler}
            >
              <CloudUploadIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography>Upload Image</Typography>
              {previewImage && (
                <Avatar
                  src={previewImage}
                  variant="rounded"
                  sx={{ mt: 2, width: 120, height: 80, mx: "auto" }}
                />
              )}
            </Box>
            <input
              type="file"
              ref={inputRef}
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setBlogImage(file);
                setPreviewImage(URL.createObjectURL(file));
              }}
            />

            <Button variant="contained" onClick={addBlogs} fullWidth>
              ADD BLOG
            </Button>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default CreateBlogs;
