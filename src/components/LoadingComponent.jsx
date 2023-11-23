import React from "react";
import { Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const FlexColumnContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const LoadingComponent = () => {
  return (
    <FlexColumnContainer>
      <Typography
        sx={{ padding: "4px 8px ", width: "40px", height: "40px" }}
        variant="h3"
      >
        Loading...
      </Typography>
      <CircularProgress
        size={64}
        color="primary"
        sx={{ marginLeft: "5rem", marginTop: "5rem" }}
      />
    </FlexColumnContainer>
  );
};
