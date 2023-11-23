import React from "react";
import { TextField, Button } from "@mui/material";
import { FlexRowContainer } from "styles/StyledComponents";
const CityInput = ({
  cityInputValue,
  setCityInputValue,
  setCity,
  getCityFromGeo,
  longitude,
  latitude,
}) => {
  return (
    <FlexRowContainer sx={{ justifyContent: "center" }}>
      <TextField
        sx={{ width: 300 }}
        value={cityInputValue}
        onChange={(e) => setCityInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setCity();
          }
        }}
        placeholder="Enter city"
      />

      <Button
        disabled={!cityInputValue}
        sx={{ p: 2, m: 1 }}
        variant="contained"
        onClick={setCity}
      >
        Find
      </Button>

      <Button
        sx={{ p: 2, m: 1 }}
        variant="contained"
        onClick={getCityFromGeo}
        disabled={!longitude || !latitude}
      >
        Take City from GPS
      </Button>
    </FlexRowContainer>
  );
};

export default CityInput;
