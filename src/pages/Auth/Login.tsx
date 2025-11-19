import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { LoadingComponent } from "../../App";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [role, setRole] = useState<string>("ADMIN");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e: any) => {
    setRole(e.target.value);
  };

  // Static credentials map
  const credentials: Record<string, { username: string; password: string }> = {
    ADMIN: { username: "Demo@12345.com", password: "123" },
    BRANCH: { username: "branch@nidhi.com", password: "12345" },
    ADVISOR: { username: "M101000001", password: "4058065" },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selected = role.toUpperCase();
    const creds = credentials[selected];
    
    console.log({formData, creds})

    // basic check
    if (!creds) {
      toast.error("Invalid role selected");
      setIsSubmitting(false);
      return;
    }

    if (formData.username === creds.username && formData.password === creds.password) {
      // Save role to localStorage so app can pick it up (useAuth falls back to this)
      localStorage.setItem("userRole", selected);
      localStorage.setItem("user", JSON.stringify({ username: formData.username, role: selected }));
      toast.success("Login successful");
      // navigate to role dashboard
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(`/${selected.toLowerCase()}/dashboard`);
      }, 300);
    } else {
      toast.error("Invalid username or password");
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <Card sx={{ width: "100%", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", backgroundColor: "#fff" }}>
          <CardContent sx={{ padding: "2rem" }}>
            <Typography component="h1" variant="h5" sx={{ color: "#7e22ce", mb: 3, textAlign: "center" }}>
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role-select"
                  value={role}
                  label="Role"
                  onChange={handleRoleChange}
                >
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="BRANCH">Branch</MenuItem>
                  <MenuItem value="ADVISOR">Advisor</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#7e22ce" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#7e22ce" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" fullWidth variant="contained" disabled={isSubmitting} sx={{ backgroundColor: "#7e22ce", "&:hover": { backgroundColor: "#581c87" } }}>
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#7e22ce", textDecoration: "none", fontWeight: "bold" }}>
                  Register
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {isSubmitting && <LoadingComponent />}
    </Container>
  );
};

export default Login;
