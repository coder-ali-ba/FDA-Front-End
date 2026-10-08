

import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../Utils/utility";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */
const tokens = {
  ink: "#1B1F1D", // text
  muted: "#5E6763", // secondary text
  line: "#DADFDC", // borders
  surface: "#F5F7F6", // page background
  chili: "#D93A26", // primary action
  chiliDark: "#B92E1D",
  basil: "#133A2D", // brand panel
  basilSoft: "#1D5A45",
  mint: "#9FD8BE",
};

const theme = createTheme({
  palette: {
    primary: { main: tokens.chili, dark: tokens.chiliDark },
    text: { primary: tokens.ink, secondary: tokens.muted },
    background: { default: tokens.surface },
  },
  shape: { borderRadius: 10 },
  typography: {
    // Add "Plus Jakarta Sans" to index.html (see notes) for the intended look.
    fontFamily:
      '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          "& fieldset": { borderColor: tokens.line },
          "&:hover fieldset": { borderColor: "#B5BDB9" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { boxShadow: "none", "&:hover": { boxShadow: "none" } },
      },
    },
  },
});

/* ------------------------------------------------------------------ */
/* Role -> dashboard routing                                           */
/* ------------------------------------------------------------------ */
const ROLE_ROUTES = {
  admin: "/admin-dashboard",
  vendor: "/vendor-dashboard",
  customer: "/client-dashboard",
};

/* ------------------------------------------------------------------ */
/* Brand panel (desktop only)                                          */
/* ------------------------------------------------------------------ */
const Logo = ({ light = false }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
    <Box
      aria-hidden
      sx={{
        width: 34,
        height: 34,
        borderRadius: "10px",
        bgcolor: tokens.chili,
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontWeight: 800,
        fontSize: 18,
      }}
    >
      F
    </Box>
    <Typography
      sx={{
        fontWeight: 800,
        fontSize: 20,
        letterSpacing: "-0.02em",
        color: light ? "#fff" : tokens.ink,
      }}
    >
      FoodDash
    </Typography>
  </Box>
);

const TRACK_STEPS = [
  { label: "Order confirmed", done: true },
  { label: "Being prepared", done: true },
  { label: "On the way", done: false, active: true },
  { label: "Delivered", done: false },
];

const OrderTracker = () => (
  <Box
    aria-hidden
    sx={{
      bgcolor: "#fff",
      color: tokens.ink,
      borderRadius: "16px",
      p: 3,
      maxWidth: 360,
      boxShadow: "0 24px 48px rgba(0,0,0,0.28)",
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2.5 }}>
      <Box>
        <Typography sx={{ fontSize: 13, color: tokens.muted }}>
          Order #4821
        </Typography>
        <Typography sx={{ fontWeight: 800, fontSize: 22, lineHeight: 1.2 }}>
          Arriving in 12 min
        </Typography>
      </Box>
      <Box
        sx={{
          alignSelf: "flex-start",
          px: 1.25,
          py: 0.5,
          borderRadius: "999px",
          bgcolor: "#E6F4EC",
          color: tokens.basilSoft,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        Live
      </Box>
    </Box>

    <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0 }}>
      {TRACK_STEPS.map((step, i) => (
        <Box
          component="li"
          key={step.label}
          sx={{ display: "flex", gap: 1.5, position: "relative", pb: i === TRACK_STEPS.length - 1 ? 0 : 2 }}
        >
          {i !== TRACK_STEPS.length - 1 && (
            <Box
              sx={{
                position: "absolute",
                left: 7,
                top: 18,
                bottom: 0,
                width: 2,
                bgcolor: step.done ? tokens.basilSoft : tokens.line,
              }}
            />
          )}
          <Box
            sx={{
              width: 16,
              height: 16,
              mt: "2px",
              borderRadius: "50%",
              flexShrink: 0,
              border: "2px solid",
              borderColor: step.done || step.active ? tokens.basilSoft : tokens.line,
              bgcolor: step.done ? tokens.basilSoft : step.active ? tokens.mint : "#fff",
              zIndex: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: step.active ? 700 : 500,
              color: step.done || step.active ? tokens.ink : tokens.muted,
            }}
          >
            {step.label}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

const BrandPanel = () => (
  <Box
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "column",
      justifyContent: "space-between",
      flex: "0 0 46%",
      p: { md: 6, lg: 8 },
      bgcolor: tokens.basil,
      color: "#fff",
      backgroundImage: `radial-gradient(circle at 85% 12%, ${tokens.basilSoft} 0, transparent 45%)`,
    }}
  >
    <Logo light />

    <Box>
      <Typography
        variant="h4"
        component="p"
        sx={{ fontSize: { md: 36, lg: 42 }, lineHeight: 1.1, maxWidth: 420, mb: 2 }}
      >
        Hot food from local kitchens, at your door.
      </Typography>
      <Typography sx={{ color: "rgba(255,255,255,0.72)", maxWidth: 380, mb: 5 }}>
        Track every order in real time, from the first stir to your doorstep.
      </Typography>
      <OrderTracker />
    </Box>

    <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
      &copy; {new Date().getFullYear()} FoodDash
    </Typography>
  </Box>
);

/* ------------------------------------------------------------------ */
/* Login                                                               */
/* ------------------------------------------------------------------ */
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (values) => {
    setServerError("");
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}auth/login`, values);
      console.log(res);
      
      const { type} = res.data.data;
      const { token } = res.data;
      
       const destination = ROLE_ROUTES[type];   

      if (!token || !destination) {
        setServerError("We couldn't sign you in with this account. Contact support.");
        return;
      }

      Cookies.set("authToken", token, { sameSite: "strict" });
      localStorage.setItem("user", type);
      navigate(destination);
    } catch (error) {
      setServerError(
        error.response?.data?.data?.message ||
          "Something went wrong. Check your connection and try again."
      );
      resetField("password"); // keep the email, clear only the password
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", display: "flex", bgcolor: "background.default" }}>
        <BrandPanel />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 2.5, sm: 4 },
            py: 6,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <Box sx={{ display: { xs: "block", md: "none" }, mb: 5 }}>
              <Logo />
            </Box>

            <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
              Welcome back
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Log in to order, manage your kitchen, or run the platform.
            </Typography>

            {serverError && (
              <Alert severity="error" sx={{ mb: 3 }} role="alert">
                {serverError}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Enter your email address",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email, like name@example.com",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Email address"
                    autoComplete="email"
                    autoFocus
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: "Enter your password" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    autoComplete="current-password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((s) => !s)}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -1 }}>
                <MuiLink
                  component={RouterLink}
                  to="/forgot-password"
                  underline="hover"
                  sx={{ fontSize: 14, fontWeight: 600, color: "primary.main" }}
                >
                  Forgot password?
                </MuiLink>
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5, fontSize: 16 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" aria-label="Logging in" />
                ) : (
                  "Log in"
                )}
              </Button>
            </Box>

            <Typography color="text.secondary" sx={{ mt: 4, textAlign: "center" }}>
              New to FoodDash?{" "}
              <MuiLink
                component={RouterLink}
                to="/signup"
                underline="hover"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                Create an account
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;