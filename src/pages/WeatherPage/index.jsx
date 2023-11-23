import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { MyContext } from "App";
import { URL } from "config/constants";
import CityInput from "./CityInput";
import PageInfo from "./PageInfo";
import WeatherDetails from "./WeatherDetails";
import ShareComponent from "./ShareComponent";
import { usePosition } from "hooks/usePosition";

export function WeatherPage() {
  const { email, setEmail, user } = useContext(MyContext);
  const { latitude, longitude } = usePosition();

  const [loading, setLoading] = useState(null);
  const [currentCity, setCurrentCity] = useState(user?.city || "");
  const [currentWeather, setCurrentWeather] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [cityInputValue, setCityInputValue] = useState("");
  const [shareURL, setShareURL] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [isShareWindowOpened, setIsShareWindowOpened] = useState(false);
  const [userName, setUserName] = useState(null);

  const handleCloseSnackbar = () => {
    setCopySuccess(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareURL);
    setCopySuccess(true);
    setIsShareWindowOpened(false);
  };

  const handleShare = () => {
    const newShareURL = `${origin}/weather?city=${encodeURIComponent(
      currentCity
    )}`;
    setShareURL(newShareURL);
    setIsShareWindowOpened(true);
  };

  async function getCityFromGeo() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setCityInputValue(response.data[0].name);
    } catch (error) {
      console.log("Expected error getCityFromGeo:", error);
    }
  }

  const setCity = () => {
    setCurrentCity(cityInputValue);
    setIsShareWindowOpened(false);
  };

  async function putUserCityDb(city) {
    try {
      const response = await axios.put(`${URL}users`, { email, city });

      console.log("setUserCityDb_response.data", response.data);
    } catch (error) {
      console.log("Expected error putUserCityDb:", error);
    }
  }

  async function getWeatherFromAPI(city) {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setCurrentWeather((prevWeather) => ({
        ...prevWeather,
        ...response.data,
      }));
      setIsLoaded(true);
      setLoading(false);

      localStorage.setItem("city", city);

      putUserCityDb(city);
    } catch (error) {
      setLoading(false);

      console.log("Expected error:", error);
      setIsLoaded(false);
    }
  }

  useEffect(() => {
    if (!email && localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email"));
    }

    if (!userName && localStorage.getItem("userName")) {
      setUserName(localStorage.getItem("userName"));
    }

    if (!currentCity && localStorage.getItem("city")) {
      setCurrentCity(localStorage.getItem("city"));
    }

    const query = queryString.parse(location.search);

    if (query.city) {
      setCurrentCity(query.city);
    }
  }, []);

  useEffect(() => {
    if (currentCity) {
      getWeatherFromAPI(currentCity);
    }
  }, [currentCity]);

  return (
    <>
      <PageInfo user={user} userName={userName} />

      <CityInput
        cityInputValue={cityInputValue}
        setCityInputValue={setCityInputValue}
        setCity={setCity}
        getCityFromGeo={getCityFromGeo}
        longitude={longitude}
        latitude={latitude}
      />

      <WeatherDetails
        isLoaded={isLoaded}
        currentWeather={currentWeather}
        currentCity={currentCity}
        loading={loading}
      />

      <ShareComponent
        shareURL={shareURL}
        handleShare={handleShare}
        handleCopy={handleCopy}
        isShareWindowOpened={isShareWindowOpened}
        currentCity={currentCity}
        copySuccess={copySuccess}
        handleCloseSnackbar={handleCloseSnackbar}
        isLoaded={isLoaded}
      />
    </>
  );
}

export default WeatherPage;
