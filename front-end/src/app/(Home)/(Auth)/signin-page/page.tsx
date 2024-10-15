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
import InputValidate from "../components/InputValidate";
import StackCustom from "../components/StackCustom";
import { DataContext, DataProvider } from "../hook/errorContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ethers, verifyMessage } from "ethers";
import CardCustom from "../components/CardCustom";
import SitemarkIcon from "../../components/SitemarkIcon";

const SignIn = () => {
  const router = useRouter();
  const [showButton, setShowButton] = React.useState(true);
  const accessToken = localStorage.getItem("access_token");

  // Use context for error variable
  const context = React.useContext(DataContext);
  if (!context) {
    return <div>Loading...</div>; // Kiểm tra nếu context không tồn tại
  }
  const { errorEmail, errorPassword } = context.errorGlobal;

  // Call api /auth/login with axios when user signin
  const authUserSignIn = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data
      );
      // Handle signin page route
      const access_token = response.data.access_token;
      if (access_token && access_token.length > 0) {
        // Save access_token into localStorage
        localStorage.setItem("access_token", response.data.access_token);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Ký thông báo bằng khóa riêng tư để thêm 1 lớp xác thực người dùng
  const signMessage = async (userId: any) =>{
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  // Khóa riêng tư của người dùng được truy xuất từ SQL Server
const {privateKey} = response.data; 
// Tạo một Wallet từ khóa riêng tư
const wallet = new ethers.Wallet(privateKey);
// console.log('wallet address',wallet.address)
// Thông báo mà bạn muốn ký (message)
const message = "Verify account ownership";
  // Ký thông báo
const signature = await wallet.signMessage(message);
  // Lấy lại địa chỉ từ chữ ký
  const recoveredAddress = verifyMessage(message, signature);
  // Kiểm tra xem địa chỉ có khớp với địa chỉ của người dùng hay không
  if (recoveredAddress === wallet.address) {
      console.log("Verification successful! Address matches.");
  } else {
      console.log("Authentication failed! Addresses do not match.");
  }
  };

  // Call api /auth/profile with axios when user signin
  const getTokenPayload = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      // Handle signin page route
      const {isActive, email,userId,role} = response.data;
      console.log(isActive);
      if (isActive) {
        // Save access_token into localStorage
        signMessage(userId);
        router.push("/dashboard-page");
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.response);
    }
  };

  // Handle from Submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const valueInput = {
      email: email.value,
      password: password.value,
    };

    // ***Add fuction check empty valueInput  (check trước khi gọi api)
    const checkEmtyData = Object.values(valueInput).every(
      (value) => value && value.length > 0
    );

    if (checkEmtyData && !errorEmail && !errorPassword) {
      const data = {
        email: valueInput.email,
        password: valueInput.password,
      };
      // Handle Call api
      authUserSignIn(data);
      getTokenPayload();
    } else alert("You must provide a valid information");
  };

  return (
    <StackCustom
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
            Sign in
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
              Sign in
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Do you have account?{" "}
              <span>
                <Link href="/signup-page/">Sign up</Link>
              </span>
            </Typography>
          </Box>
          <Divider />
        </CardCustom>
      </Stack>
    </StackCustom>
  );
};

// Bao bọc ParentComponent bằng DataProvider
const Page: React.FC = () => {
  return (
    <DataProvider>
      <SignIn />
    </DataProvider>
  );
};

export default Page;
