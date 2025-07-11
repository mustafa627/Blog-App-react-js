import React, { useEffect, useState } from "react";
import Navbar from "../CMP/Navbar";
import { Stack, Box, CircularProgress, Grid } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ToastAlert from "../utilitis";
import BlogCard from "../CMP/Card";
const Blogs = () => {
  const [blogData, setBlogData] = useState([]);
  
    const [loading, setLoading] = useState(false)
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getDocs(collection(db, "blogs"));
      setLoading(false);
      const temArr = [];
      response.forEach((doc) => {
        const obj = { ...doc.data(), id: doc.id };
        temArr.push(obj);
      });
      setBlogData(temArr);
      
      // console.log("blogs", blogData)
    } catch (error) {
      console.log("error", error.message);
        setLoading(false)
      ToastAlert({
        type: "error",
        message: error.message || "something went wront",
      });
    }
  };

  return (
    <>
      <Navbar />   
   {loading ? (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      width: '100%',
    }}
  >
    <CircularProgress size={50} color="secondary" />
  </Box>
) : (
  <Grid container spacing={2} sx={{ px: { xs: 1, sm: 2, md: 3 }, py: 1 }}>
    {blogData
      .filter((blog) => blog.isActive && !blog.isPrivate)
      .map((obj) => (
        <Grid item xs={12} sm={6} md={4} key={obj.id}>
          <BlogCard cardDetails={obj} />
        </Grid>
      ))}
  </Grid>
)}

    </>
  );
};

export default Blogs;
