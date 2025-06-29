import React, { useEffect, useState } from "react";
import Navbar from "../CMP/Navbar";
import { Stack, Box, CircularProgress, Button } from "@mui/material";
import Card from "../CMP/Card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ToastAlert from "../utilitis";
import BlogCard from "../CMP/Card";
import { useNavigate } from "react-router-dom";
 const MyBlogs = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, [refresh]);
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
      setLoading(false);
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh", // Adjustable based on design
            width: "100%",
          }}
        >
          <CircularProgress size={50} color="secondary" />
        </Box>
      ) : (
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
{
  !blogData.some((obj) => obj.userId === localStorage.getItem("user")) && (
    <Box
      sx={{
        width: "100%",
        minHeight: "40vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <h3>You have no blogs yet</h3>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/createblogs")}
      >
        Create Your First Blog
      </Button>
    </Box>
  )
}

 {blogData.map((obj) => {
            return (
              obj.userId === localStorage.getItem("user") && (
                <BlogCard
                  key={obj.id}
                  cardDetails={obj}
                  actionBtn={true}
                  setRefresh={setRefresh}
                />
              )
            );
          })}
        </div>
      )} 
    </>
  );
};

export default MyBlogs;
