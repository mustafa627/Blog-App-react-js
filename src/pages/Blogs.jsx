import React, { useEffect, useState } from "react";
import Navbar from "../CMP/Navbar";
import { Stack, Box, CircularProgress } from "@mui/material";
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
   { loading ? <Box
     sx={{
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       minHeight: '50vh',  // Adjustable based on design
       width: '100%',
     }}
   >
     <CircularProgress size={50} color="secondary" />
   </Box> :  <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "20px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
       {blogData.filter((blog) => blog.isActive)
  .map((obj) => {
    return !obj.isPrivate && <BlogCard key={obj.id} cardDetails={obj} />;
  })}
      </div>}
    </>
  );
};

export default Blogs;
