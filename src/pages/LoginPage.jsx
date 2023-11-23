import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";

import { FlexColumnContainer } from "styles/StyledComponents";
import { MyContext } from "App";
import axios from "axios";
import { URL } from "config/constants";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { users, setUsers, email, setEmail, user, setUser } =
    useContext(MyContext);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
  };

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));

    if (!emailRegex.test(email)) {
      return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("userName", email.split("@")[0]);
    localStorage.setItem("city", "");

    const foundedUser = users?.find((user) => user.email === email);

    if (foundedUser) {
      setUser(foundedUser);

      localStorage.setItem("city", foundedUser.city);

      navigate("/weather");
    } else {
      setUser(null);
      postUserCityDb("");

      console.log("user not found");
      navigate("/weather");
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${URL}users`);

      console.log("getUsers-response.data", response.data);
      setUsers(response.data);

      console.log('The "getUsers" request was successful');
    } catch (error) {
      console.error('Error while executing the "getUsers" request:', error);
      return;
    }
  };

  async function postUserCityDb(city) {
    try {
      const response = await axios.post(`${URL}users`, { email, city });

      console.log("setUserCityDb_response.data", response.data);
    } catch (error) {
      console.log("Expected error postUserCityDb:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <FlexColumnContainer
        sx={{
          height: "100vh",
        }}
      >
        <Typography variant="h4" align="center" m={2} color="primary.main">
          Login Page
        </Typography>
        <Typography variant="body1" align="center" m={2}>
          Enter your email to login
        </Typography>
        <TextField
          label="Enter email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          error={!isValidEmail}
          helperText={!isValidEmail ? "Invalid email format" : ""}
          sx={{ width: 300 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <Button
          sx={{ p: 2, m: 1 }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ width: 150 }}
          disabled={!users}
        >
          Send
        </Button>
      </FlexColumnContainer>
    </>
  );
};
