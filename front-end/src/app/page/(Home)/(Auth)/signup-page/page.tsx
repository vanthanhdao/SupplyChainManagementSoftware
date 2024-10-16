"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { styled } from "@mui/system";
import InputValidate from "../components/InputValidate";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import axios from "axios";
import { DataContext, DataProvider } from "../hook/errorContext";
import SitemarkIcon from "../../components/SitemarkIcon";
require("dotenv").config();

const CardCustom = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 4,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

const SignUp = () => {
  const router = useRouter();
  const [showButton, setShowButton] = React.useState(true);

  // Use context for error variable
  const context = React.useContext(DataContext);
  if (!context) {
    return <div>Loading...</div>; // Kiểm tra nếu context không tồn tại
  }
  const { errorGlobal } = context;

  // Create wallet using ethers.js
  // Update Wallet info into state
  const generateWallet = (): any => {
    try {
      const newWallet = ethers.Wallet.createRandom();
      return {
        publicKey: newWallet.address,
        privateKey: newWallet.privateKey,
      };
    } catch (error) {
      console.error("Create wallet error:", error);
    }
  };

  // Call api with axios
  const createUser = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        data
      );
      // Handle signin page route
      router.push("/signin-page");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle Sunmit Sign In From
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const password = document.getElementById("password") as HTMLFormElement;
    const email = document.getElementById("email") as HTMLFormElement;
    const repassword = document.getElementById("repassword") as HTMLFormElement;
    const valueInput = {
      email: email.value,
      password: password.value,
      repassword: repassword.value,
    };
    // ***Add fuction check errorGlobal (check trước khi gọi api)
    const checkErrorGlobal = Object.values(errorGlobal).every(
      (value) => !value
    );
    // ***Add fuction check empty valueInput  (check trước khi gọi api)
    const checkEmtyData = Object.values(valueInput).every(
      (value) => value && value.length > 0
    );
    if (checkErrorGlobal && checkEmtyData) {
      // ***Add fuction check password easswqual re-pord (check trước khi gọi api)
      const checkValidPass = valueInput.password === valueInput.repassword;
      if (!checkValidPass)
        return alert("You must provide RePassword a valid information");

      const wallet = generateWallet();
      const data = {
        email: valueInput.email,
        password: valueInput.password,
        walletAddress: {
          publicKey: wallet.publicKey,
          privateKey: wallet.privateKey,
        },
      };
      // Handle Call api
      createUser(data);
    } else alert("You must provide a valid information");
  };

  return (
    <SignUpContainer
      direction="column"
      justifyContent="space-between"
      sx={{
        py: { xs: 8, sm: 16 },
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          p: 2,
        }}
      >
        <CardCustom variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            onSubmit={handleSubmit}
            component="form"
            id="signup"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box
              onClick={() => setShowButton(false)}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {/* Input Custom Component */}
              {/* <InputValidate
                nameLable="Company Name"
                idLable="name"
                placeholder="Jon Snow"
                type="text"
              /> */}
              <InputValidate
                nameLable="Email"
                idLable="email"
                placeholder="your@email.com"
                type="text"
              />
              <InputValidate
                nameLable="Password"
                idLable="password"
                placeholder="••••••"
                type="password"
              />
              <InputValidate
                nameLable="RePassword"
                idLable="repassword"
                placeholder="••••••"
                type="password"
              />
              {/* <InputValidate
                nameLable="Tax Code"
                idLable="taxcode"
                placeholder="0000000001"
                type="text"
              />
              <InputValidate
                nameLable="Certificates"
                idLable="certificate"
                placeholder="Certificate.png"
                type="file"
                multiple={true}
                onSendData={handleDataFromChild}
              /> */}
            </Box>
            <FormControlLabel
              control={
                <Checkbox value="allowExtraEmails" color="primary" required />
              }
              label="Undertake that all information provided is true and accurate."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={showButton}
            >
              Sign up
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span>
                <Link href="/signin-page/">Sign in</Link>
              </span>
            </Typography>
          </Box>
          <Divider />
        </CardCustom>
      </Stack>
    </SignUpContainer>
  );
};

// Bao bọc ParentComponent bằng DataProvider
const Page: React.FC = () => {
  return (
    <DataProvider>
      <SignUp />
    </DataProvider>
  );
};

export default Page;
