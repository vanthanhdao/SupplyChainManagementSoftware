"use client";
import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { DataContext } from "../hook/errorContext";

export default function InputValidate(props: IInputValidate) {
  const { nameLable, idLable, placeholder, type, multiple, onSendData } = props;
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  // Use Context for error variable
  const context = React.useContext(DataContext);
  if (!context) {
    return <div>Loading...</div>; // Kiểm tra nếu context không tồn tại
  }
  const { errorGlobal,setErrorGlobal } = context;

  // Handle validate for inputs box
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
            setErrorGlobal({
              ...errorGlobal,
              errorEmail: true,
            });
          } else {
            setError(false);
            setErrorMessage("");
            setErrorGlobal({
              ...errorGlobal,
              errorEmail: false,
            });
          }
          break;

        case "password" :
          if (value.length < 6) {
            setError(true);
            setErrorMessage("Password must be at least 6 characters long.");
            setErrorGlobal({
              ...errorGlobal,
              errorPassword: true,
            });
          } else {
            setError(false);
            setErrorMessage("");
            setErrorGlobal({
              ...errorGlobal,
              errorPassword: false,
            });
          }
          break;

          case "repassword":
              if (value.length < 6) {
                setError(true);
                setErrorMessage("Replay Password must be at least 6 characters long.");
                setErrorGlobal({
                  ...errorGlobal,
                  errorRePassword: true,
                });
              } else {
                setError(false);
                setErrorMessage("");
                setErrorGlobal({
                  ...errorGlobal,
                  errorRePassword: false,
                });
              }
            break;

        // case "taxcode":
        //   if (!/^\d+$/.test(value)) {
        //     setError(true);
        //     setErrorMessage("Tax code must is a number.");
        //   } else {
        //     setError(false);
        //     setErrorMessage("");
        //   }
        //   break;

        // default:
        //   setError(false);
        //   setErrorMessage("");
        //   break;
      }
    } else {
      setError(true);
      setErrorMessage(`${nameLable} is required.`);
      switch(id){
        case 'email':
          setErrorGlobal({
            ...errorGlobal,
            errorEmail: true,
          });
          break;
        case 'password':
          setErrorGlobal({
            ...errorGlobal,
            errorPassword: true,
          });
        break;
        case 'repassword':
          setErrorGlobal({
            ...errorGlobal,
            errorRePassword: true,
          });
          break;
      }
    }
  };

  // Handle when user onChange in inputs box
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    validateInputs(event);
    // if(onSendData) onSendData(event.target.files);    
  };

   // Handle when user onFocus in inputs box
  const handleOnFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError(false);
    setErrorMessage("");
  };

   // Handle when user onBlur in inputs box
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
        // inputProps={{
        //   multiple: { multiple },
        // }}
      />
    </FormControl>
  );
}
