import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUpdateEmailMutation } from "../lib/features/apis/emailsApi";
import { Alert, Box, CircularProgress } from "@mui/material";

export const Fished = () => {
  const { id } = useParams();
  const [updateEmail, { isLoading }] = useUpdateEmailMutation();

  useEffect(() => {
    if (id) {
      updateEmail(id);
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress sx={{ m: "auto" }} />
      ) : (
        <Alert severity="success" sx={{ height: "fit-content", m: 5 }}>
          Ooops. Employee Fished!!!
        </Alert>
      )}
    </Box>
  );
};
