import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import MenuAppBar from "../components/MenuAppBar";

const AuthedLayout = () => {
  const { pathname } = useLocation();
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {!pathname.includes("news") && <MenuAppBar />}
      <Outlet />
    </Box>
  );
};

export default AuthedLayout;
