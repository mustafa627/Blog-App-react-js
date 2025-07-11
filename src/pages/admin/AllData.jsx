import React, { useEffect, useState } from "react";
import DashboardLayoutBasic from "../../CMP/AdminLayout";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Grid,
  Chip,
  Switch,
  Box,
} from "@mui/material";

const AllData = () => {
  const [allData, setAllData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    (async () => {
      const getCards = await getDocs(collection(db, "blogs"));
      const tempArr = [];
      getCards.forEach((doc) => {
        const obj = { ...doc.data(), id: doc.id };
        tempArr.push(obj);
      });
      setAllData(tempArr);
    })();
  }, [refresh]);

  return (
    <DashboardLayoutBasic>
      <h1
        style={{ textAlign: "center", marginBottom: "20px", fontSize: "40px" }}
      >
        All Data
      </h1>
      <Grid container spacing={3}>
        {allData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Box height="100%">
              <Card
                sx={{
                  height: "100%",
                  maxWidth: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  transition: "0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image || "https://via.placeholder.com/400x200"}
                  alt={item.title}
                  sx={{
                    height: { xs: 140, sm: 160 },  
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    px: { xs: 1.5, sm: 2 },
                    py: 2,
                  }}
                >
                  <Typography variant="h6" noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" noWrap>
                    {item.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#555",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.desc}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(item.createdAt.seconds * 1000).toLocaleString()}
                  </Typography>
                  <Chip
                    label={item.isPrivate ? "Private" : "Public"}
                    color={item.isPrivate ? "default" : "success"}
                    size="small"
                    sx={{ width: "fit-content" }}
                  />
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", px: 2 }}>
                  <Switch
                    checked={item.isActive}
                    onChange={async (e) => {
                      await updateDoc(doc(db, "blogs", item.id), {
                        isActive: e.target.checked,
                      });
                      setRefresh((prev) => !prev);
                    }}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </DashboardLayoutBasic>
  );
};

export default AllData;
