import Snackbar from "../../common/_partials/controls/Snackbar";
import React, { createContext, useState, useContext } from "react";

const SnackNotificationContext = createContext();

export function useSnackNotification() {
  return useContext(SnackNotificationContext);
}

export const SnackNotificationConsumer = SnackNotificationContext.Consumer;

export function SnackNotificationProvider({ children }) {
  const [snack, setSnack] = useState({
    open: false,
    id: null,
    message: "",
    variant: "success",
  });

  const showSuccess = (message) => {
    setSnack({
      open: true,
      id: new Date().getTime(),
      message: message,
      variant: 'success',
    })
  }

  const showError = (message) => {
    setSnack({
      open: true,
      id: new Date().getTime(),
      message: message,
      variant: 'error',
    })
  }

  const value = { snack, setSnack, showSuccess, showError};

  return (
  <SnackNotificationContext.Provider value={value}>
    {children}
    <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        options={snack}
        id={snack.id}
        variant={snack.variant}
        content={snack.message}
      />
  </SnackNotificationContext.Provider>);
}
