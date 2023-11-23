import React from "react";
import { Typography } from "@mui/material";
import { LoadingComponent } from "components/LoadingComponent";
import { WeatherComponent } from "pages/WeatherPage/WeatherComponent";

const WeatherDetails = ({ isLoaded, currentWeather, currentCity, loading }) => {
  if (!currentCity) {
    return (
      <Typography variant="h4" align="center" m={2} color="primary.main">
        Please enter your city
      </Typography>
    );
  }

  if (loading) {
    return <LoadingComponent />;
  }

  if (!isLoaded) {
    return (
      <Typography variant="h4" align="center" m={2} color="primary.main">
        City not found...
      </Typography>
    );
  }

  return (
    <WeatherComponent
      isLoaded={isLoaded}
      weather={currentWeather}
      headerValue={currentCity}
    />
  );
};

export default WeatherDetails;
