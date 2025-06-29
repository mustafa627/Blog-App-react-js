import React, { useEffect, useState } from "react";
import DashboardLayoutBasic from "../../CMP/AdminLayout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const blogSnap = await getDocs(collection(db, "blogs"));

      const userArr = [];
      usersSnap.forEach((doc) => userArr.push(doc.data()));
      const blogArr = [];
      blogSnap.forEach((doc) => blogArr.push(doc.data()));

      setUsers(userArr);
      setBlogs(blogArr);
    })();
  }, []);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.isActive).length;
  const totalBlogs = blogs.length;
  const activeBlogs = blogs.filter((b) => b.isActive).length;

  return (
    <DashboardLayoutBasic>
      <h1 style={{textAlign: "center", marginBottom: "10px"}}>Admin Dashboard</h1>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">{activeUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Blogs</Typography>
              <Typography variant="h4">{totalBlogs}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Blogs</Typography>
              <Typography variant="h4">{activeBlogs}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayoutBasic>
  );
};

export default AdminDashboard;
