// import React, { useContext, useState } from "react";
// import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
// import "./style.scss";
// import Logo from "../../assets/logo.svg";
// import { TextField, InputAdornment, IconButton } from "@mui/material";
// import config from "@/config";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { AdminContext } from "../../context/AdminContext";
// const { backend_url } = config;

// const Login = () => {
//   const [isLoading, setIsLoadingLogin] = useState(false);
//   const [isLoadingLoginGoogle, setIsLoadingLoginGoogle] = useState(false);
//   const [isLoadingSignup, setIsLoadingSignup] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showKey, setShowKey] = useState(false);
//   const [signUpEnable, setSignUpEnable] = useState(false);
//   const [forgotPasswordEnable, setForgotPasswordEnable] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [key, setKey] = useState("");
//   const [keyError, setKeyError] = useState(null);
//   const [password, setPassword] = useState("");
//   const [passwordError, setPasswordError] = useState(null);
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState(null);
//   const [nameError, setNameError] = useState(null);
//   const [emailError, setEmailError] = useState(null);
//   const { admin } = useContext(AdminContext);
//   const navigate = useNavigate();
//   console.log(admin);

//   const handleGoogleLogin = () => {
//     setIsLoadingLoginGoogle(true);
//     window.location.href = `${backend_url}/admin/auth/google`;
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };
//   const toggleKeyVisibility = () => {
//     setShowKey(!showKey);
//   };

//   const validateLoginFields = () => {
//     if (!email || !password) {
//       alert("Email and password are required.");
//       return false;
//     }
//     return true;
//   };

//   const validateSignUpFields = () => {
//     let isValid = true;

//     if (!email) {
//       setEmailError("Email is required.");
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("Invalid email format.");
//       isValid = false;
//     } else {
//       setEmailError(null);
//     }

//     if (!password) {
//       setPasswordError("Password is required.");
//       isValid = false;
//     } else {
//       setPasswordError(null);
//     }

//     return isValid;
//   };
//   const handleLogin = async () => {
//     let payload = { email, password };
//     console.log(email, password);
//     try {
//       setIsLoadingLogin(true);
//       const { data } = await axios.post(`${backend_url}/admin/login`, payload);

//       console.log("logindata=======>>>>>", data);
//       toast(data.message);
//       localStorage.setItem("token", data.token);
//       navigate("/");
//       setIsLoadingLogin(false);
//     } catch (error) {
//       console.log(error);
//       setIsLoadingLogin(false);
//     }
//     if (true) {
//       // Perform login action
//     }
//   };
//   const passwordChange = async () => {
//     let payload = { key, password, confirmPassword };
//     try {
//       const { data } = await axios.put(`${backend_url}/admin`, payload);
//       toast(data.message);
//       setForgotPasswordEnable(false);
//       setPassword("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSignUp = () => {
//     // if (validateSignUpFields()) {
//     //   setIsLoadingSignup(true);
//     //   // Perform sign-up action
//     // }
//     passwordChange();
//   };

//   const handleEmailBlur = () => {
//     if (!email) {
//       setEmailError("Email is required.");
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("Invalid email format.");
//     } else {
//       setEmailError(null);
//     }
//   };
//   const validatePasswords = () => {
//     if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match.");
//     } else {
//       setConfirmPasswordError(null);
//     }
//   };
//   return (
//     <div className="container">
//       <div className="Login-container">
//         <div className="img">
//           <img src={Logo} alt="sortmycollege" />
//         </div>
//         <div className="login-inputs">
//           {forgotPasswordEnable && (
//             <>
//               <TextField
//                 label="Key"
//                 type={showKey ? "text" : "password"}
//                 variant="outlined"
//                 value={key}
//                 onChange={(e) => {
//                   setKey(e.target.value);
//                   setKeyError(null);
//                 }}
//                 onBlur={() => !key && setKeyError("Key is required.")}
//                 error={!!keyError}
//                 helperText={keyError}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={toggleKeyVisibility}
//                       >
//                         {showKey ? <FaEye /> : <FaEyeSlash />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </>
//           )}
//           {forgotPasswordEnable && (
//             <>
//               <TextField
//                 id="standard-password-input"
//                 label="New Password"
//                 type={showPassword ? "text" : "password"}
//                 variant="outlined"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   setPasswordError(null);
//                   validatePasswords();
//                 }}
//                 onBlur={() => {
//                   if (!password) {
//                     setPasswordError("New Password is required.");
//                   }
//                   validatePasswords();
//                 }}
//                 error={!!passwordError}
//                 helperText={passwordError}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={togglePasswordVisibility}
//                       >
//                         {showPassword ? <FaEye /> : <FaEyeSlash />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </>
//           )}
//           {forgotPasswordEnable && (
//             <>
//               <TextField
//                 id="standard-password-input"
//                 label="Confirm New Password"
//                 type={showConfirmPassword ? "text" : "password"}
//                 variant="outlined"
//                 value={confirmPassword}
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value);
//                   setConfirmPasswordError(null);
//                   validatePasswords();
//                 }}
//                 onBlur={() => {
//                   if (!confirmPassword) {
//                     setPasswordError("Confirm Password is required.");
//                   }
//                   validatePasswords();
//                 }}
//                 error={!!confirmPasswordError}
//                 helperText={confirmPasswordError}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={toggleConfirmPasswordVisibility}
//                       >
//                         {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </>
//           )}
//           {/* {signUpEnable && (
//             <>
//               <TextField
//                 id="outlined-basic"
//                 label="Name"
//                 variant="outlined"
//                 value={name}
//                 onChange={(e) => {
//                   setName(e.target.value);
//                   setNameError(null);
//                 }}
//                 onBlur={() => !name && setNameError("Name is required.")}
//                 error={!!nameError}
//                 helperText={nameError}
//               />
//             </>
//           )} */}
//           {!forgotPasswordEnable && (
//             <TextField
//               id="outlined-basic"
//               label="Email"
//               variant="outlined"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 setEmailError(null);
//               }}
//               onBlur={handleEmailBlur}
//               error={!!emailError}
//               helperText={emailError}
//             />
//           )}
//           {!forgotPasswordEnable && (
//             <TextField
//               id="standard-password-input"
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               autoComplete="current-password"
//               variant="outlined"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setPasswordError(null);
//               }}
//               onBlur={() =>
//                 !password && setPasswordError("Password is required.")
//               }
//               error={!!passwordError}
//               helperText={passwordError}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={togglePasswordVisibility}
//                     >
//                       {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           )}

//           {forgotPasswordEnable && (
//             <div className="buttons">
//               <button
//                 className="Google-login-button"
//                 onClick={handleSignUp}
//                 disabled={isLoadingSignup}
//               >
//                 {isLoadingSignup ? "Saving Password" : "Change Password"}
//               </button>
//             </div>
//           )}
//           {/* {signUpEnable && (
//             <div className="buttons">
//               <button
//                 className="Google-login-button"
//                 onClick={handleSignUp}
//                 disabled={isLoadingSignup}
//               >
//                 {isLoadingSignup ? "Signing up..." : "Sign Up"}
//               </button>
//             </div>
//           )} */}
//           {(signUpEnable || forgotPasswordEnable) && (
//             <div className="buttons">
//               <button
//                 className="Google-login-button"
//                 onClick={() => {
//                   setSignUpEnable(false);
//                   setForgotPasswordEnable(false);
//                   setPassword("");
//                 }}
//                 disabled={isLoadingSignup}
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//           {!signUpEnable && !forgotPasswordEnable && (
//             <p className="forgot">
//               <div onClick={() => setForgotPasswordEnable(true)}>
//                 {" "}
//                 Forgot your password?
//               </div>
//             </p>
//           )}
//           {!signUpEnable && !forgotPasswordEnable && (
//             <div className="buttons">
//               <button
//                 className="Google-login-button"
//                 onClick={handleLogin}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Logging in..." : "Login"}
//               </button>
//             </div>
//           )}

//           {/* {!signUpEnable && !forgotPasswordEnable && (
//             <button
//               className="Google-login-button"
//               onClick={handleGoogleLogin}
//               disabled={isLoadingLoginGoogle}
//             >
//               <FaGoogle className="Google-icon" />
//               {isLoadingLoginGoogle ? "Logging in..." : "Login with Google"}
//             </button>
//           )} */}
//           {/* {!signUpEnable && !forgotPasswordEnable && <p className="or">Or</p>}
//           {!signUpEnable && !forgotPasswordEnable && <hr />} */}
//         </div>
//         {/* {!signUpEnable && !forgotPasswordEnable && (
//           <>
//             <p>
//               {`Don't have an account? `}
//               <span className="signup" onClick={() => setSignUpEnable(true)}>
//                 Sign Up
//               </span>
//             </p>
//           </>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Login;





// import React, { useContext, useState } from "react";
// import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
// import "./style.scss";
// import Logo from "../../assets/logo.svg";
// import { TextField, InputAdornment, IconButton } from "@mui/material";
// import config from "@/config";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { AdminContext } from "../../context/AdminContext";
// const { backend_url } = config;

// const Login = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [emailError, setEmailError] = useState(null);
//   const [passwordError, setPasswordError] = useState(null);
//   const [otpError, setOtpError] = useState(null);
//   const { admin } = useContext(AdminContext);
//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const validateLoginFields = () => {
//     let isValid = true;

//     if (!email) {
//       setEmailError("Email is required.");
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("Invalid email format.");
//       isValid = false;
//     } else {
//       setEmailError(null);
//     }

//     if (!password) {
//       setPasswordError("Password is required.");
//       isValid = false;
//     } else {
//       setPasswordError(null);
//     }

//     return isValid;
//   };

//   const handleSendOtp = async () => {
//     if (!validateLoginFields()) return;

//     try {
//       setIsLoading(true);

//       // Step 1: Verify Email & Password (but don't save token yet)
//       const loginResponse = await axios.post(
//         `${backend_url}/admin/login`,
//         { email, password }
//       );

//       console.log("Login Response:", loginResponse.data);

//       if (loginResponse.data.message === "Login successful") {
//         // toast.success("Password verified! Sending OTP...");

//         // Step 2: Send OTP
//         const otpResponse = await axios.post(
//           "http://localhost:8006/generate-otp-for-admin",
//           { phone_number: "919782209395" }
//         );

//         if (otpResponse.status === 200 && otpResponse.data.message === "OTP sent successfully") {
//           toast.success("OTP sent successfully!");
//           setIsOtpSent(true); // Show OTP input field
//         } else {
//           toast.error("Failed to send OTP. Please try again.");
//         }
//       } else {
//         toast.error("Invalid credentials. Please try again.");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Verify OTP and Store Token
//   const handleLogin = async () => {
//     if (!otp) {
//       setOtpError("OTP is required");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "http://localhost:8006/veryfy-otp-for-admin",
//         {
//           phone_number: "919782209395",
//           otp: otp,
//           email: email
//         }
//       );

//       if (response.status === 200 && response.data.message === "OTP verified successfully") {
//         toast.success("Login successful!");

//         // Store token (assuming API returns a token)
//         if (response.data.token) {
//           localStorage.setItem("token", response.data.token);
//         }


//         navigate("/"); // Redirect to home page
//       } else {
//         toast.error("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       setOtpError("Invalid OTP");
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="Login-container">
//         <div className="img">
//           <img src={Logo} alt="sortmycollege" />
//         </div>
//         <div className="login-inputs">
//           <TextField
//             id="outlined-basic"
//             label="Email"
//             variant="outlined"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//               setEmailError(null);
//             }}
//             onBlur={() => {
//               if (!email) {
//                 setEmailError("Email is required.");
//               } else if (!/\S+@\S+\.\S+/.test(email)) {
//                 setEmailError("Invalid email format.");
//               } else {
//                 setEmailError(null);
//               }
//             }}
//             error={!!emailError}
//             helperText={emailError}
//           />

//           <TextField
//             id="standard-password-input"
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             autoComplete="current-password"
//             variant="outlined"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//               setPasswordError(null);
//             }}
//             onBlur={() => !password && setPasswordError("Password is required.")}
//             error={!!passwordError}
//             helperText={passwordError}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {isOtpSent && (
//             <TextField
//               id="outlined-otp-input"
//               label="OTP"
//               variant="outlined"
//               value={otp}
//               onChange={(e) => {
//                 setOtp(e.target.value);
//                 setOtpError(null);
//               }}
//               onBlur={() => !otp && setOtpError("OTP is required.")}
//               error={!!otpError}
//               helperText={otpError}
//             />
//           )}

//           <div className="buttons">
//             {!isOtpSent ? (
//               <button
//                 className="Google-login-button"
//                 onClick={handleSendOtp}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             ) : (
//               <button
//                 className="Google-login-button"
//                 onClick={handleLogin}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Logging in..." : "Login"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useContext, useState, useEffect } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.scss";
import Logo from "../../assets/logo.svg";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import config from "@/config";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
const { backend_url } = config;

const Login = () => {
  // Existing states
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [otpError, setOtpError] = useState(null);

  // Forgot password states (from commented code)
  const [forgotPasswordEnable, setForgotPasswordEnable] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const { admin } = useContext(AdminContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleKeyVisibility = () => {
    setShowKey(!showKey);
  };

  const validateLoginFields = () => {
    let isValid = true;

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

    return isValid;
  };

  const handleSendOtp = async () => {
    if (!validateLoginFields()) return;

    try {
      setIsLoading(true);

      // Step 1: Verify Email & Password
      const loginResponse = await axios.post(
        `${backend_url}/admin/login`,
        { email, password }
      );

      if (loginResponse.data.message === "Login successful") {
        // Step 2: Send OTP
        const otpResponse = await axios.post(
          `${backend_url}/admin/generate-otp-for-admin`,
          { phone_number: "919782209395" }
        );

        if (otpResponse.status === 200 && otpResponse.data.message === "OTP sent successfully") {
          toast.success("OTP sent successfully!");
          setIsOtpSent(true);
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!otp) {
      setOtpError("OTP is required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${backend_url}/admin/veryfy-otp-for-admin`,
        {
          phone_number: "919782209395",
          otp: otp,
          email: email
        }
      );

      if (response.status === 200 && response.data.message === "OTP verified successfully") {
        toast.success("Login successful!");
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        navigate("/");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setOtpError("Invalid OTP");
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password functions (from commented code)
  const passwordChange = async () => {
    let payload = { key, password: newPassword, confirmPassword };
    try {
      const { data } = await axios.put(`${backend_url}/admin`, payload);
      toast(data.message);
      setForgotPasswordEnable(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError(null);
      }
    }
  }, [newPassword, confirmPassword]);


  return (
    <div className="container">
      <div className="Login-container">
        <div className="img">
          <img src={Logo} alt="sortmycollege" />
        </div>
        <div className="login-inputs">
          {/* Forgot Password Section */}
          {forgotPasswordEnable && (
            <>
              <TextField
                label="Key"
                type={showKey ? "text" : "password"}
                variant="outlined"
                value={key}
                onChange={(e) => {
                  setKey(e.target.value);
                  setKeyError(null);
                }}
                onBlur={() => !key && setKeyError("Key is required.")}
                error={!!keyError}
                helperText={keyError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleKeyVisibility}
                      >
                        {showKey ? <FaEye /> : <FaEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="New Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm New Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          {/* Login Section */}
          {!forgotPasswordEnable && (
            <>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(null);
                }}
                onBlur={() => {
                  if (!email) {
                    setEmailError("Email is required.");
                  } else if (!/\S+@\S+\.\S+/.test(email)) {
                    setEmailError("Invalid email format.");
                  } else {
                    setEmailError(null);
                  }
                }}
                error={!!emailError}
                helperText={emailError}
              />

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
                onBlur={() => !password && setPasswordError("Password is required.")}
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

          {/* OTP Section */}
          {isOtpSent && !forgotPasswordEnable && (
            <TextField
              id="outlined-otp-input"
              label="OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setOtpError(null);
              }}
              onBlur={() => !otp && setOtpError("OTP is required.")}
              error={!!otpError}
              helperText={otpError}
            />
          )}

          {/* Buttons Section */}
          <div className="buttons">
            {forgotPasswordEnable ? (
              <>
                <button
                  className="Google-login-button"
                  onClick={passwordChange}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving Password" : "Change Password"}
                </button>
                <button
                  className="Google-login-button"
                  onClick={() => {
                    setForgotPasswordEnable(false);
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </>
            ) : isOtpSent ? (
              <button
                className="Google-login-button"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            ) : (
              <button
                className="Google-login-button"
                onClick={handleSendOtp}
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            )}
          </div>

          {/* Forgot Password Link */}
          {!forgotPasswordEnable && !isOtpSent && (
            <p className="forgot">
              <span onClick={() => setForgotPasswordEnable(true)}>
                Forgot your password?
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;