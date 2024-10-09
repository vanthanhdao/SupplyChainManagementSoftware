"use client";
import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function InputValidate(props: IInputValidate) {
  const { nameLable, idLable, placeholder, type, multiple, onSendData } = props;
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const validateInputs = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;

    if (value && value.length > 0) {
      switch (id) {
        case "email":
          if (!/\S+@\S+\.\S+/.test(value)) {
            setError(true);
            setErrorMessage("Please enter a valid email address.");
          } else {
            setError(false);
            setErrorMessage("");
          }
          break;

        case "password" :
        case "repassword":
          if (value.length < 6) {
            setError(true);
            setErrorMessage("Password must be at least 6 characters long.");
          } else {
            setError(false);
            setErrorMessage("");
          }
          break;

        case "taxcode":
          if (!/^\d+$/.test(value)) {
            setError(true);
            setErrorMessage("Tax code must is a number.");
          } else {
            setError(false);
            setErrorMessage("");
          }
          break;

        default:
          setError(false);
          setErrorMessage("");
          break;
      }
    } else {
      setError(true);
      setErrorMessage(`${nameLable} is required.`);
    }
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    validateInputs(event);
    if(onSendData) onSendData(event.target.files);
  };

  const handleOnFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError(false);
    setErrorMessage("");
  };

  const handleOnBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    validateInputs(event);
  };

  return (
    <FormControl>
      <FormLabel htmlFor={idLable}>{nameLable}</FormLabel>
      <TextField
        type={type}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        name={idLable}
        fullWidth
        id={idLable}
        placeholder={placeholder}
        error={error}
        helperText={errorMessage}
        color={errorMessage ? "error" : "primary"}
        onChange={handleOnChange}
        inputProps={{
          multiple: { multiple },
        }}
      />
    </FormControl>
  );
}
