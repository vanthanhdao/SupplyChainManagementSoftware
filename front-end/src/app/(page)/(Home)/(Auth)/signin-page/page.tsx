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
import { DataContext, DataProvider } from "../../../../hook/errorContext";
import { useRouter } from "next/navigation";
import CardCustom from "../components/CardCustom";
import SitemarkIcon from "../../components/SitemarkIcon";
import { authJwtLogin } from "@/app/apis/index-api";
import { useSetAccessToken } from "@/app/hook/useAccessToken";
import {
  useConnectMetaMask,
  useGetWalletAddress,
  useProvideEthUser,
} from "@/app/hook/useEthereum";
import useUserStore from "@/app/zustands/userStore";

const SignIn = () => {
  const router = useRouter();
  const [showButton, setShowButton] = React.useState(true);

  // Use context for error variable
  const context = React.useContext(DataContext);
  if (!context) {
    return <div>Loading...</div>; // Kiểm tra nếu context không tồn tại
  }
  const { errorEmail, errorPassword } = context.errorGlobal;

  // Handle Sign In
  const authUserSignIn = async (data: IUserSignIn) => {
    if (!data) {
      console.error("You must provide valid data");
      return;
    }

    try {
      await useConnectMetaMask();
      const wallet = await useGetWalletAddress();
      if (!wallet) return;
      await useProvideEthUser(wallet);
      // Handle veryfired email and password
      const response = await authJwtLogin(data);
      const { access_token, refresh_token } = response;

      // Save access_token and refresh_token in sessionStorage
      await Promise.all([
        useSetAccessToken("access_token", access_token),
        useSetAccessToken("refresh_token", refresh_token),
      ]);

      // Route to the dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("authUserSignIn failed: ", error);
      router.push("/Error");
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
