import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import ToastAlert from "../utilitis";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

export default function BlogCard({ cardDetails, actionBtn, setRefresh }) {
  // console.log("cardDetails", cardDetails);

  const deleteBlog = async () => {
    await deleteDoc(doc(db, "blogs", cardDetails.id));
    setRefresh((prev) => !prev);
    ToastAlert({
      type: "success",
      message: "Blog deleted successfully!",
    });
  };
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          width: "100%",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderRadius: 2,
          maxWidth: "245px",
          backgroundColor: "#f9f9f9",
          transition: "all 0.3s ease",
           margin: "0 auto",
            // marginLeft: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          marginTop: "20px",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            transform: "scale(1.02)",
          },
        }}
      >
        <CardMedia
          component="img"
          alt={cardDetails.title}
          height="140"
          image={cardDetails.image || "https://via.placeholder.com/400x200"}
          sx={{
            objectFit: "cover",
            width: "80%",
             display: "flex",
            justifyContent: "center",
            flexDirection: "column",   
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" noWrap>
            Title: {cardDetails.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Subject: {cardDetails.subject}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            ID: {cardDetails.userId}
          </Typography>
        </CardContent>
        {actionBtn && (
          <CardActions sx={{ justifyContent: "flex-end", px: 2 }}>
            <Button
              size="small"
              onClick={() => navigate(`/updateblogs/${cardDetails.id}`)}
            >
              Edit
            </Button>
            <Button size="small" onClick={deleteBlog}>
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}
