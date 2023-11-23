import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

import { FlexRowContainer, FlexColumnContainer } from "styles/StyledComponents";
import sunny from "images/sunny.jpg";
import cloudy from "images/clouds.jpg";
import sunAndClouds from "images/sunAndClouds.jpg";
import snow from "images/snow.jpg";
import rain from "images/rain.jpg";
import haze from "images/haze.jpg";
import theme from "styles/theme";

export const WeatherComponent = ({ weather, headerValue }) => {
  const [weatherImg, setWeatherImg] = useState("");

  const celcius = Number(weather?.main?.temp.toFixed(0));

  useEffect(() => {
    if (weather?.weather?.[0].main === "Clouds") {
      if (weather?.weather?.[0].description === "partly cloudy") {
        setWeatherImg(sunAndClouds);
      } else {
        setWeatherImg(cloudy);
      }
    } else if (weather?.weather?.[0].main === "Clear") {
      setWeatherImg(sunny);
    } else if (weather?.weather?.[0].main === "Snow") {
      setWeatherImg(snow);
    } else if (weather?.weather?.[0].main === "Rain") {
      setWeatherImg(rain);
    } else if (weather?.weather?.[0].main === "Haze") {
      setWeatherImg(haze);
    } else {
      setWeatherImg("");
    }
  }, [weather]);

  return (
    <Box
      sx={{
        paddingTop: "1rem",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ color: "white" }}>
          {headerValue.toUpperCase()}
        </Typography>

        <FlexRowContainer>
          <FlexRowContainer
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              p: 2,
              width: "100%",
            }}
          >
            <Box>
              <img src={weatherImg} alt="Weather" style={{ width: "100%" }} />
            </Box>

            <FlexColumnContainer
              sx={{ paddingLeft: "1rem", textAlign: "start", width: "100%" }}
            >
              <Typography variant="h3" sx={{ color: "orange" }}>
                {celcius}°C
              </Typography>
              <Typography variant="h5">
                {weather?.weather?.[0].description?.[0].toUpperCase()}
                {weather?.weather?.[0].description?.slice(1)}
              </Typography>
            </FlexColumnContainer>
          </FlexRowContainer>

          <FlexColumnContainer
            sx={{
              width: "100%",
            }}
          >
            <Typography
              sx={{
                color: "black",
                fontSize: "1rem",
                marginBottom: "1rem",
              }}
            >
              Temperature: {celcius} °C
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontSize: "1rem",
                marginBottom: "1rem",
              }}
            >
              Feels like: {weather?.main?.feels_like.toFixed(0)} °C
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontSize: "1rem",
                marginBottom: "1rem",
              }}
            >
              Wind Speed: {weather?.wind?.speed.toFixed(1)} m/s
            </Typography>
            <Typography sx={{ color: "black", fontSize: "1rem" }}>
              Humidity: {weather?.main?.humidity}%
            </Typography>
          </FlexColumnContainer>
        </FlexRowContainer>
      </Box>
    </Box>
  );
};
