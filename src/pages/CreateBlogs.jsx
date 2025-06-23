import Navbar from "../CMP/Navbar";
import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ToastAlert from "../utilitis";
import axios from "axios";

const CLOUD_NAME = `dfeznwdqp`;
const API_KEY = `V0SLkUEoMVIrhOIcdwzBNEsseAE`;


const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [blogPrivate, setBlogPrivate] = useState(false);
  const [blogImage, setBlogImage] = useState("");
   const inputRef = useRef();
   const fileHandler = () => {
        // console.log("fileHandler", inputRef.current)
        inputRef.current.click()
    }
  const addBlogs = async () => {
    try {
  var url = "";
  if (blogImage) {
    const formData = new FormData();
    formData.append("file", blogImage);
    formData.append("upload_preset", "mustafa")
    const resImage = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, formData)
    .catch((err) => {
      console.log(err.message,  "error in image upload");
    })
  //  console.log("imageUrl", resImage.data.secure_url);
 url = resImage.data.secure_url
  }


      const obj = {
        title: title,
        subject: subject,
        desc: desc,
        isPrivate: blogPrivate,
        image: url,
        createdAt: new Date(),
        userId: localStorage.getItem("user"),
      };
      console.log("obj", obj);
      if(!title || !subject || !desc) {
        ToastAlert({
          type: "error",
          message: "Please fill all fields!",
        });
        return;
      }
      
      await addDoc(collection(db, "blogs"), obj);
      setTitle("");
      setSubject("");
      setDesc("");
      setBlogPrivate(false);
      setBlogImage("")
      ToastAlert({
        type: "success",
        message: "Blog Successfully created!",
      });
    } catch (e) {
      console.log("error", e.message);
    }
  };
  return (
    <div>
      <Navbar />
      <Stack
        direction="column"
        spacing={2}
        sx={{
          width: "50%",
          margin: "auto",
          marginTop: "50px",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" align="center">
          Create a New Blog
        </Typography>
        <TextField
          id="outlined-basic"
          label="Title"
          value={title}
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Subject"value={subject}
          variant="outlined"
          onChange={(e) => setSubject(e.target.value)}
        />

        <TextField
          label="Description"
          multiline
          minRows={3}
          maxRows={6}
          variant="outlined"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Box sx={{ display: "flex",  gap: 2, alignItems: "center" , justifyContent: "space-around" }}>
        <FormControlLabel
          control={
            <input
              type="checkbox"
              onChange={(e) => setBlogPrivate(e.target.checked)}
            />
          } 
          label=" isPrivate ??"
          value={blogPrivate}
        />
        <Stack   justifyContent="center" spacing={2} >
 <FormControlLabel sx={{border: "1px solid black" , height: "100px" , padding: "10px", borderBlockEndColor: "green"}} onClick={fileHandler}  control={<CloudUploadIcon />} label="Upload Image" />
          </Stack>
          </Box>
          <input type="file" hidden ref={inputRef} onChange={(e) => setBlogImage(e.target.files[0])} />
        <Button variant="contained" onClick={addBlogs}>
          ADD
        </Button>
      </Stack>
    </div>
  );
};

export default CreateBlogs;
