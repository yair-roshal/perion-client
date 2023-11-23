import React from "react";
import { Typography } from "@mui/material";
import { FlexColumnContainer, FlexRowContainer } from "styles/StyledComponents";

const PageInfo = ({ user, userName }) => {
  console.log('userName :>> ', userName);
  return (
    <>
      <FlexColumnContainer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlexRowContainer>
          <Typography
            sx={{ fontWeight: "800" }}
            variant="h4"
            align="center"
            m={2}
            color="primary.main"
          >
            Weather Page
          </Typography>
        </FlexRowContainer>

        <Typography variant="h4" align="center" m={2}>
          Hello {userName}
        </Typography>

        <Typography variant="h5" align="center" m={2}>
          {localStorage.getItem("city")
            ? ` Your Last City from LocalStorage :  ${localStorage.getItem(
                "city"
              )}`
            : ""}
        </Typography>

        <Typography variant="h5" align="center" m={2}>
          {user ? ` Your Last City from DB :  ${user?.city}` : ""}
        </Typography>
      </FlexColumnContainer>
    </>
  );
};

export default PageInfo;
