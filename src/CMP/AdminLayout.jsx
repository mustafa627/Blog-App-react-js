import * as React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Box, CssBaseline, Divider, Drawer, IconButton,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Toolbar, Typography
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

function AdminLayout(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: "Dashboard", url: "/dashboard/admin", icon: <DashboardIcon /> },
    { name: "Blogs", url: "/dashboard/admin/alldata", icon: <ArticleIcon /> },
    { name: "Users", url: "/dashboard/admin/users", icon: <GroupIcon /> }
  ];

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: '#f0f2f5' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                to={item.url}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 2,
                  backgroundColor: isActive ? '#1976d2' : 'transparent',
                  color: isActive ? '#fff' : 'inherit',
                  '&:hover': {
                    backgroundColor: isActive ? '#1565c0' : '#e3f2fd',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#fff' : '#1976d2' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          color: '#000',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Mobile */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: '#fafafa',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

AdminLayout.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node,
};

export default AdminLayout;
