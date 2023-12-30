import React, { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.scss";
import Logo from "../../assets/logo.svg";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { backend_url } from "../../config";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";

const Login = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingLoginGoogle, setIsLoadingLoginGoogle] = useState(false);
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpEnable, setSignUpEnable] = useState(false);
  const [forgotPasswordEnable, setForgotPasswordEnable] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [dobError, setDobError] = useState(null);

  const handleGoogleLogin = () => {
    setIsLoadingLoginGoogle(true);
    window.location.href = `${backend_url}/counsellor/auth/google`;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateLoginFields = () => {
    if (!email || !password) {
      alert("Email and password are required.");
      return false;
    }
    return true;
  };

  const validateSignUpFields = () => {
    let isValid = true;

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    } else {
      setNameError(null);
    }

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (!dob) {
      setDobError("Date of Birth is required.");
      isValid = false;
    } else {
      setDobError(null);
    }

    return isValid;
  };

  const handleLogin = () => {
    if (validateLoginFields()) {
      setIsLoadingLogin(true);
      // Perform login action
    }
  };

  const handleSignUp = () => {
    if (validateSignUpFields()) {
      setIsLoadingSignup(true);
      // Perform sign-up action
    }
  };

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError(null);
    }
  };

  return (
    <div className="container">
      <div className="Login-container">
        <div className="img">
          <img src={Logo} alt="sortmycollege" />
        </div>
        <div className="login-inputs">
          {forgotPasswordEnable && (
            <>
              <TextField
                id="standard-password-input"
                label="New Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                variant="outlined"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(null);
                }}
                onBlur={() =>
                  !password && setPasswordError("New password is required.")
                }
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
          {forgotPasswordEnable && (
            <>
              <TextField
                id="standard-password-input"
                label="Confirm New Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                variant="outlined"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(null);
                }}
                onBlur={() =>
                  !password && setPasswordError("Confirm password is required.")
                }
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
          {signUpEnable && (
            <>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(null);
                }}
                onBlur={() => !name && setNameError("Name is required.")}
                error={!!nameError}
                helperText={nameError}
              />
            </>
          )}
          {!forgotPasswordEnable && (
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              onBlur={handleEmailBlur}
              error={!!emailError}
              helperText={emailError}
            />
          )}
          {!forgotPasswordEnable && (
            <TextField
              id="standard-password-input"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(null);
              }}
              onBlur={() =>
                !password && setPasswordError("Password is required.")
              }
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          {signUpEnable && (
            <DatePicker
              label="Date of Birth"
              value={dob}
              onChange={(date) => setDob(date)}
              onBlur={() => !dob && setDobError("Date of Birth is required.")}
              error={!!dobError}
              helperText={dobError}
            />
          )}
          {forgotPasswordEnable && (
            <div className="buttons">
              <button
                className="Google-login-button"
                onClick={handleSignUp}
                disabled={isLoadingSignup}
              >
                {isLoadingSignup ? "Saving Password" : "Change Password"}
              </button>
            </div>
          )}
          {signUpEnable && (
            <div className="buttons">
              <button
                className="Google-login-button"
                onClick={handleSignUp}
                disabled={isLoadingSignup}
              >
                {isLoadingSignup ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          )}
          {(signUpEnable || forgotPasswordEnable) && (
            <div className="buttons">
              <button
                className="Google-login-button"
                onClick={() => {
                  setSignUpEnable(false);
                  setForgotPasswordEnable(false);
                }}
                disabled={isLoadingSignup}
              >
                Cancel
              </button>
            </div>
          )}
          {!signUpEnable && !forgotPasswordEnable && (
            <p className="forgot">
              <div onClick={() => setForgotPasswordEnable(true)}>
                {" "}
                Forgot your password?
              </div>
            </p>
          )}
          {!signUpEnable && !forgotPasswordEnable && (
            <div className="buttons">
              <button
                className="Google-login-button"
                onClick={handleLogin}
                disabled={isLoadingLogin}
              >
                {isLoadingLogin ? "Logging in..." : "Login"}
              </button>
            </div>
          )}

          {!signUpEnable && !forgotPasswordEnable && (
            <button
              className="Google-login-button"
              onClick={handleGoogleLogin}
              disabled={isLoadingLoginGoogle}
            >
              <FaGoogle className="Google-icon" />
              {isLoadingLoginGoogle ? "Logging in..." : "Login with Google"}
            </button>
          )}
          {!signUpEnable && !forgotPasswordEnable && <p className="or">Or</p>}
          {!signUpEnable && !forgotPasswordEnable && <hr />}
        </div>
        {!signUpEnable && !forgotPasswordEnable && (
          <>
            <p>
              {`Don't have an account? `}
              <span className="signup" onClick={() => setSignUpEnable(true)}>
                Sign Up
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
