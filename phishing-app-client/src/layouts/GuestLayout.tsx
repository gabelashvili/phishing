import { Avatar, Box, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";

const GuestLayout = () => {
  return (
    <Box
      sx={{
        maxWidth: 450,
        width: "100%",
        height: "100%",
        display: "flex",
        m: "auto",
        p: 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 4 }}>
        <Avatar sx={{ m: "auto", my: 2 }}>
          <LockOutlined />
        </Avatar>
        <Outlet />
      </Paper>
    </Box>
  );
};

export default GuestLayout;
