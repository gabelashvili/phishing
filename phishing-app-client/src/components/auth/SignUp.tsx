import { LoadingButton } from "@mui/lab";
import { Box, Grid, Link, TextField, Typography } from "@mui/material";
import { useRegisterMutation } from "../../lib/features/apis/authApi";
import { IAuth } from "../../@types/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../../validations/auth-schemas";

const SignUp = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const {
    formState: { errors },
    handleSubmit,
    register: registerInput,
  } = useForm<IAuth>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(authSchema),
  });

  const handleRegister = handleSubmit(async (data) => {
    try {
      await register(data).unwrap();
      toast.success("Registered...");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              error={!!errors.email}
              {...registerInput("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              error={!!errors.password}
              {...registerInput("password")}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleRegister}
          loading={isLoading}
          size="large"
        >
          Sign Up
        </LoadingButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
