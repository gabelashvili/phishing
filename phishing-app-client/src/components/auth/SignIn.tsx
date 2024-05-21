import { Box, Grid, Link, TextField, Typography } from "@mui/material";
import { useLoginMutation } from "../../lib/features/apis/authApi";
import { useState } from "react";
import { IAuth } from "../../@types/user";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

const SignIn = () => {
  const [values, setValues] = useState<IAuth>({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      await login(values).unwrap();
      toast.success("Logged in ...");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "fit-content",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogin}
          loading={isLoading}
          size="large"
        >
          Sign in
        </LoadingButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="sign-up" variant="body2">
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignIn;
