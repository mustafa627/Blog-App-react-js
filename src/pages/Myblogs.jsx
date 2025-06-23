import React, { useEffect, useState } from "react";
import Navbar from "../CMP/Navbar";
import { Stack, Box, CircularProgress } from "@mui/material";
import Card from "../CMP/Card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ToastAlert from "../utilitis";
import BlogCard from "../CMP/Card";
const MyBlogs = () => {
  const [blogData, setBlogData] = useState([]);
  // const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      // setLoading(true);
      const response = await getDocs(collection(db, "blogs"));
      // setLoading(false);
      const temArr = [];
      response.forEach((doc) => {
        const obj = { ...doc.data(), id: doc.id };
        temArr.push(obj);
      });
      setBlogData(temArr);
      // console.log("blogs", blogData)
    } catch (error) {
      console.log("error", error.message);
      ToastAlert({
        type: "error",
        message: error.message || "something went wront",
      });
    }
  };

  return (
    <>
  {/* loading && <CircularProgress /> : */}
      <Navbar />
       <div
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
              {blogData.map((obj) => {
                return !obj.isPrivate && <BlogCard key={obj.id} cardDetails={obj}  actionBtn={true} />;
              })}
            </div>
    </>
  );
};

export default MyBlogs
