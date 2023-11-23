import React from "react";
import { Button, TextField } from "@mui/material";

import ShareIcon from "@mui/icons-material/Share";
import CopyIcon from "@mui/icons-material/FileCopy";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ShareComponent = ({
  shareURL,
  handleShare,
  handleCopy,
  isShareWindowOpened,
  currentCity,
  copySuccess,
  handleCloseSnackbar,
  isLoaded,
}) => {
  return (
    <>
      {shareURL && isShareWindowOpened ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            value={shareURL}
            fullWidth
            variant="outlined"
            disabled
            sx={{ mr: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleCopy}
            startIcon={<CopyIcon />}
          >
            Copy
          </Button>
        </div>
      ) : (
        <Button
          sx={{ p: 2, m: 1 }}
          variant="contained"
          startIcon={<ShareIcon />}
          onClick={handleShare}
          disabled={!currentCity || !isLoaded}
        >
          Share
        </Button>
      )}

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareComponent;
