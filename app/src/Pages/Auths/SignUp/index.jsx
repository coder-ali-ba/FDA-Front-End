import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  createTheme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../Utils/utility";

/* ------------------------------------------------------------------ */
/* Design tokens (identical to Login)                                  */
/* ------------------------------------------------------------------ */
const tokens = {
  ink: "#1B1F1D",
  muted: "#5E6763",
  line: "#DADFDC",
  surface: "#F5F7F6",
  chili: "#D93A26",
  chiliDark: "#B92E1D",
  basil: "#133A2D",
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

const ROLE_INFO = [
  {
    title: "Customer",
    text: "Browse local kitchens, order in a few taps, and track your delivery live.",
  },
  {
    title: "Vendor",
    text: "List your menu, accept orders, and reach hungry neighbours near you.",
  },
];

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
        Create your account and start in minutes.
      </Typography>
      <Typography sx={{ color: "rgba(255,255,255,0.72)", maxWidth: 380, mb: 5 }}>
        One account works for ordering or selling. Pick the one that fits you.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 380 }}>
        {ROLE_INFO.map((role) => (
          <Box
            key={role.title}
            sx={{
              p: 2.5,
              borderRadius: "14px",
              bgcolor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <Typography sx={{ fontWeight: 800, mb: 0.5 }}>{role.title}</Typography>
            <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>
              {role.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>

    <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
      &copy; {new Date().getFullYear()} FoodDash
    </Typography>
  </Box>
);

/* ------------------------------------------------------------------ */
/* Signup                                                              */
/* ------------------------------------------------------------------ */
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "", phNumber: "", type: "" },
  });

  const submitHandler = async (values) => {
    setServerError("");
    setLoading(true);

    try {
      const response =await axios.post(`${BASE_URL}auth/signup`, values);
      console.log(response);
      
      navigate("/");
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Something went wrong. Check your connection and try again."
      );
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
          <Box sx={{ width: "100%", maxWidth: 420 }}>
            <Box sx={{ display: { xs: "block", md: "none" }, mb: 5 }}>
              <Logo />
            </Box>

            <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
              Create your account
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              It takes less than a minute.
            </Typography>

            {serverError && (
              <Alert severity="error" sx={{ mb: 3 }} role="alert">
                {serverError}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit(submitHandler)}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              {/* Account type */}
              <Controller
                name="type"
                control={control}
                rules={{ required: "Choose an account type" }}
                render={({ field }) => (
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, mb: 1 }}>
                      I want to
                    </Typography>
                    <ToggleButtonGroup
                      exclusive
                      fullWidth
                      value={field.value}
                      onChange={(_, value) => value && field.onChange(value)}
                      aria-label="Account type"
                      sx={{
                        gap: 1.5,
                        "& .MuiToggleButtonGroup-grouped": {
                          border: `1px solid ${tokens.line} !important`,
                          borderRadius: "10px !important",
                          bgcolor: "#fff",
                          color: tokens.ink,
                          py: 1.4,
                          fontWeight: 700,
                          textTransform: "none",
                          "&:hover": { bgcolor: "#FBFCFB" },
                          "&.Mui-selected": {
                            bgcolor: "#FDECE9",
                            color: tokens.chiliDark,
                            borderColor: `${tokens.chili} !important`,
                          },
                        },
                      }}
                    >
                      <ToggleButton value="customer">Order food</ToggleButton>
                      <ToggleButton value="vendor">Sell food</ToggleButton>
                    </ToggleButtonGroup>
                    {errors.type && (
                      <FormHelperText error sx={{ mx: 1.75 }}>
                        {errors.type.message}
                      </FormHelperText>
                    )}
                  </Box>
                )}
              />

              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Enter your full name",
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full name"
                    autoComplete="name"
                    autoFocus
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />

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
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="phNumber"
                control={control}
                rules={{
                  required: "Enter your phone number",
                  pattern: {
                    value: /^\+?[0-9\s-]{7,15}$/,
                    message: "Enter a valid phone number",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="tel"
                    label="Phone number"
                    autoComplete="tel"
                    fullWidth
                    error={!!errors.phNumber}
                    helperText={errors.phNumber?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Create a password",
                  minLength: {
                    value: 8,
                    message: "Use at least 8 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    autoComplete="new-password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message || "At least 8 characters"}
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

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5, fontSize: 16, mt: 0.5 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" aria-label="Creating account" />
                ) : (
                  "Create account"
                )}
              </Button>
            </Box>

            <Typography color="text.secondary" sx={{ mt: 4, textAlign: "center" }}>
              Already have an account?{" "}
              <MuiLink
                component={RouterLink}
                to="/"
                underline="hover"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                Log in
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;