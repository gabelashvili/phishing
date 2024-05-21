import { Route, Routes } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import { Box, CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { useEffect } from "react";
import { usePingMutation } from "./lib/features/apis/authApi";
import { logOut } from "./lib/features/slices/authSlice";
import AuthedLayout from "./layouts/AuthedLayout";
import Home from "./components/Home";
import { Fished } from "./components/Fished";

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [ping] = usePingMutation();

  const handlePing = async () => {
    await ping().unwrap();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      handlePing();
    } else {
      dispatch(logOut());
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <Box
        sx={{
          display: "flex",
        }}
      >
        {auth.status === "pending" && (
          <CircularProgress sx={{ display: "flex", m: "auto" }} />
        )}
        {auth.status === "guest" && (
          <Routes>
            <Route path="/" element={<GuestLayout />}>
              <Route index element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />,
            </Route>
          </Routes>
        )}
        {auth.status === "authed" && (
          <Routes>
            <Route path="/" element={<AuthedLayout />}>
              <Route index element={<Home />} />
              <Route path="news/:id" element={<Fished />} />
            </Route>
          </Routes>
        )}
      </Box>
    </>
  );
}

export default App;
