import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate for redirection
import styles from "./styles.module.css";
import { useAuthContext } from "../hooks/hook";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Initialize the navigate function
  const { setUserFromStorage } = useAuthContext();
  const location = useLocation(); // Get the location state
  const from = location.state?.from?.pathname || "/main"; // Determine redirect path

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/api/users/login";
      console.log("Sign In data being sent:", data);
      const { data: res } = await axios.post(url, data);
      setUserFromStorage(res.user); // Make sure the backend sends `firstName` along with other user details
      localStorage.setItem("token", res.token); // Save token to localStorage
      toast.success("Sign In Success");
      navigate(from); // Redirect to the intended page
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message); // Show error message from the backend
        toast.error("Sign In Error");
      }
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <h1 className={styles.title}>Loginpage</h1>
        <button className={styles.Button} onClick={() => navigate("/")}>
          Home
        </button>
      </nav>
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Login to Your Account</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <div className={styles.passwordInputGroup}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className={styles.input}
                />
                <label className={styles.showPasswordLabel}>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  Show Password
                </label>
              </div>

              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sign In
              </button>
            </form>
          </div>
          <div className={styles.right}>
            <h1>New Here?</h1>
            <Link to="/signup">
              <button type="button" className={styles.white_btn}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
