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
    <Card
      sx={{
        width: 280,
        margin: "10px",
        boxShadow: "0 0 5px #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        "&:hover": {
          boxShadow: "0 0 10px #aaa",
          transform: "scale(1.02)",
        },
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="110"
        image={cardDetails.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Title : {cardDetails.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Desc : {cardDetails.subject}
        </Typography>{" "}
        <br />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          ID : {cardDetails.userId}
        </Typography>
      </CardContent>
      <CardActions>
        {actionBtn && (
          <CardActions>     
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
      </CardActions>
    </Card>
  );
}
