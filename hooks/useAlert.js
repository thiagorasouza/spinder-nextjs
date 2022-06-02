import { useState } from "react";

let alertTimer;

function useAlert(customDuration) {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);

  let alertTimer;

  function showAlert(message) {
    const duration = customDuration || 2000;
    setMessage({
      message,
      type: "info",
      duration,
    });
    setVisible(true);

    alertTimer = setTimeout(() => {
      hideAlert();
    }, duration);
  }

  function hideAlert() {
    clearTimeout(alertTimer);
    setVisible(false);
  }

  return {
    alert: message,
    alertVisible: visible,
    showAlert,
    hideAlert,
  };
}

export default useAlert;
