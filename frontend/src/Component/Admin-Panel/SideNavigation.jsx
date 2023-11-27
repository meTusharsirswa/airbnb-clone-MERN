import React from 'react';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HotelIcon from '@mui/icons-material/Hotel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from "react-router-dom";

const SideNavigation = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Divider />
      <List>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton component={Link} to="/admin-dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Hotels" disablePadding>
          <ListItemButton component={Link} to="add-hotels">
            <ListItemIcon>
              <HotelIcon />
            </ListItemIcon>
            <ListItemText primary="Hotels" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNavigation;
