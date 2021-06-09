import React, { createContext, useCallback, useState } from "react";
import { THROWS } from "../utils";

export type ErrorType = "error" | "success" | "warning" | "info";
export type SnackAlertContextType = {
  type: ErrorType;
  message: string;
  errorIsShown: boolean;
  hideError: () => void;
  setError: (message: string, type: ErrorType) => void;
};
export const SnackAlertContext = createContext<SnackAlertContextType>({
  type: "info",
  message: "",
  errorIsShown: false,
  hideError: THROWS,
  setError: THROWS,
});

SnackAlertContext.displayName = "UserLendingContext";

export const SnackAlertProvider: React.FC = ({ children }) => {
  const [message, setErrorMessage] = useState("");
  const [errorIsShown, setErrorShown] = useState(false);
  const [type, setErrorType] = useState<ErrorType>("info");

  const hideError = useCallback(() => {
    setErrorShown(false);
  }, []);

  const setError = useCallback((message: string, type: ErrorType) => {
    const validMessages = [
        // Tuple, first one is old matched message, second string is new message shown to user
      [
        "execution reverted: ERC20: transfer amount exceeds balance",
        "Insufficient fund. Please check your balance.",
      ],
    ];
    const contains = validMessages
      .filter(([m]) => message.indexOf(m) > 0)
      .map(([_, newMessage]) => newMessage);
    if (contains.length > 0) {
      setErrorShown(true);
      setErrorMessage(contains[0]);
      setErrorType(type);
    }
  }, []);

  return (
    <SnackAlertContext.Provider
      value={{
        type,
        errorIsShown,
        message,
        hideError,
        setError,
      }}
    >
      {children}
    </SnackAlertContext.Provider>
  );
};
