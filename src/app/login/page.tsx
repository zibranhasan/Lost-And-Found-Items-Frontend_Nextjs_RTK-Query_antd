"use client";

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/actions/userLogin";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";

const theme = createTheme();

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For handling errors
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const res = await loginUser(email, password);

      if (res?.data?.id && res?.data?.token) {
        // Save the token to localStorage
        localStorage.setItem("token", res.data.token);
        // Dispatch setUser with the whole data payload
        dispatch(setUser(res.data));

        // Redirect based on the user's role
        if (res.data.role === "ADMIN") {
          router.push("/dashboard/admin/manageUserAccounts");
        } else {
          router.push("/dashboard/user");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Login failed: " + (err?.message || "Something went wrong!"));
    }
  };

  const handleClickOpen = (role: "user" | "admin") => {
    const newCredentials =
      role === "user"
        ? { email: "user@gmail.com", password: "123456" }
        : { email: "admin@gmail.com", password: "123456" };

    setCredentials(newCredentials);
    setEmail(newCredentials.email); // Auto-fill email
    setPassword(newCredentials.password); // Auto-fill password
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginBottom: 4,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ "aria-label": "Email Address" }} // Accessibility
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ "aria-label": "Password" }} // Accessibility
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          {/* New Buttons for User and Admin Credentials */}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleClickOpen("user")}
            sx={{ mt: 2 }}
          >
            User Credentials
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleClickOpen("admin")}
            sx={{ mt: 2 }}
          >
            Admin Credentials
          </Button>

          {/* Dialog for Credentials */}
          {/* <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Credentials</DialogTitle>
            <DialogContent>
              <Typography>Email: {credentials.email}</Typography>
              <Typography>Password: {credentials.password}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog> */}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
