import { Snackbar } from "@mui/material";
import React from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBar({ variant = "info", children }) {
  const [open, setOpen] = React.useState(false);
  const [openerror, setOpenerror] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenerror(false);
  };
  return (
    <div>
      <Snackbar
        open={openerror}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {children}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackBar;
