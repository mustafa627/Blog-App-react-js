import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { Transform } from "@mui/icons-material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AdbIcon from "@mui/icons-material/Adb";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import ToastAlert from "../utilitis";
// const pages = [ 'Blog'  , "My Blog" , "Create Blog"];
const pages = [
  {
    title: "Home",
    url: "/blogs",
  },
  {
    title: "My Blog",
    url: "/myblogs",
  },
  {
    title: "Create Blog",
    url: "/createblogs",
    logo: <AddCardOutlinedIcon />,
  },
];
const settings = ["Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
const navigate = useNavigate()
const handleLogout = () => {
  // console.log( "logout")
    signOut(auth)
    .then(() => {
      console.log("Logged out successfully");
       ToastAlert({
          type: "succes",
          message: "Logged out successfully",
        });
          localStorage.removeItem("user");  
        localStorage.clear();  
        navigate("/")
      // optional: redirect or show toast
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });

}

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1e1e1e",
        boxShadow: "0 0 5px #ccc",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          width: "100%",

          gap: "20px",
        }}
      >
        <Toolbar disableGutters>
          <AcUnitIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BlogApp
          </Typography>

           
           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
  <IconButton
    size="large"
    aria-label="account of current user"
    aria-controls="menu-appbar"
    aria-haspopup="true"
    onClick={handleOpenNavMenu}
    color="inherit"
  >
    <MenuIcon />
  </IconButton>
  <Menu
    id="menu-appbar"
    anchorEl={anchorElNav}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    open={Boolean(anchorElNav)}
    onClose={handleCloseNavMenu}
    sx={{ display: { xs: "block", md: "none" } }}
  >
    {pages.map((page) => (
      <MenuItem key={page.title} onClick={handleCloseNavMenu}>
        <Link
          to={page.url}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          {page.logo}
          {page.title}
        </Link>
      </MenuItem>
    ))}
  </Menu>
</Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",

              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "white",
                  },
                }}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "green",
                    gap: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  to={page.url}
                >
                  <span>{page.logo}</span>
                  {page.title}
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Logout">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               <Button  sx={{backgroundColor: "white"}} onClick={handleLogout}>Logout</Button>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
