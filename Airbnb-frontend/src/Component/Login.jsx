import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import TextField from "@mui/material/TextField";


import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import Alert from "@mui/joy/Alert";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import LinearProgress from "@mui/joy/LinearProgress";
import Button from "@mui/joy/Button";

import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";

import axios from "axios";



const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful");
        setShowSuccessAlert(true);

        // setTimeout(() => {
        // }, 3000);

        setTimeout(() => {
          setShowSuccessAlert(false);

          navigate("/dashboard");
        }, 2000);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
    }
  };

  return (
    <>
      <Stack
        spacing={2}
        sx={{ maxWidth: 400 }}
        className={`success-alert ${
          showSuccessAlert ? "show-success-alert" : ""
        }`}
      >
        {" "}
        {showSuccessAlert && (
          <Alert
            size="lg"
            color="success"
            variant="solid"
            invertedColors
            startDecorator={
              <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                  minWidth: 40,
                  borderRadius: "50%",
                  boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
                }}
              >
                <div>
                  <Check fontSize="xl2" />
                </div>
              </AspectRatio>
            }
            endDecorator={
              <IconButton
                variant="plain"
                sx={{
                  "--IconButton-size": "32px",
                  transform: "translate(0.5rem, -0.5rem)",
                }}
              ></IconButton>
            }
            sx={{ alignItems: "flex-start", overflow: "hidden" }}
          >
            <div>
              <Typography level="title-lg">Success</Typography>
              <Typography level="body-sm">
                User Login Successfully !!!
              </Typography>
            </div>
            <LinearProgress
              variant="soft"
              value={40}
              sx={(theme) => ({
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                color: `rgb(${theme.vars.palette.success.lightChannel} / 0.72)`,
                "--LinearProgress-radius": "0px",
              })}
            />
          </Alert>
        )}
      </Stack>
      <div className="d-flex ">
        <section className="p-5 m-auto login_container mt-5">
          <h2 className="fw-semibold fs-1">Login</h2>
          <p className="fs-6" style={{ width: "85%" }}>
            Get access to your Orders, Wishlist, and Recommendations
          </p>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Enter email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" login_input_field"
            />
            <br />
            <TextField
              className="login_input_field mt-3 mb-2"
              id="outlined-basic"
              label="Enter Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>
              By continuing, you agree to Flipkart's{" "}
              <span className="text-primary">Terms of Use </span> and{" "}
              <span className="text-primary">Privacy Policy.</span>
            </p>
            <Button
              type="submit"
              className="Login-btn"
              endDecorator={<KeyboardArrowRight />}
            >
              Login
            </Button>
          </form>
          <Link to="/register" className="mt-2 d-flex justify-content-center">
            New to Flipkart? Create an account
          </Link>
          <span></span>
        </section>
      </div>
    </>
  );
};

export default Login;
