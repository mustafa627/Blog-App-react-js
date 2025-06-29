// import React, { useEffect, useState } from "react";
// import DashboardLayoutBasic from "../../CMP/AdminLayout";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase";

// const AllData = () => {
// const [allData, setAllData] = useState([])
// useEffect(()=> {
//   (async()=> {
//     const getCards = await getDocs(collection(db, "blogs"))

//     const tempArr = []
//     getCards.forEach((doc)=> {
// const obj = {...doc.data(), id: doc.id}
// tempArr.push(obj)
// console.log("setAllData", obj)
//     })
//     setAllData(tempArr)
//   })();
// }, [])

//   return(
//     <DashboardLayoutBasic>
// <h1>all data</h1>
//     </DashboardLayoutBasic>
//   )
// };

// export default AllData;
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
} from "@mui/material";

const AllData = () => {
  const [allData, setAllData] = useState([]);
const [ refresh, setRefresh] = useState(false)
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
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "10px" }}
      >
        All Blog Posts
      </Typography>
      <Grid container spacing={3}>
        {allData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image || "https://via.placeholder.com/400x200"}
                alt={item.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {item.subject}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {item.desc?.length > 100
                    ? item.desc.slice(0, 100) + "..."
                    : item.desc}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  {new Date(item.createdAt.seconds * 1000).toLocaleString()}
                </Typography>
                <Chip
                  label={item.isPrivate ? "Private" : "Public"}
                  color={item.isPrivate ? "default" : "success"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <CardActions>
                <Switch
                  checked={item.isActive}
                  onChange={async (e) => {
                    await updateDoc(doc(db, "blogs", item.id), {
                      isActive: e.target.checked,
                    });
                    setRefresh(!refresh)
                    console.log(
                      "item.isActive type:",
                      typeof item.isActive,
                      item.isActive
                    );
                  }}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardLayoutBasic>
  );
};

export default AllData;
