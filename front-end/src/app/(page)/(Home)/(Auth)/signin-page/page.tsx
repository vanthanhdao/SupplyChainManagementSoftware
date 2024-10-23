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
import {
  authJwtLogin,
  getAccountWallet,
  getAccount,
} from "@/app/apis/index-api";
import {
  useProvideEthUser,
  useStoreSession,
  useStoreUserSession,
  useVerifyWallet,
} from "@/app/hook/useEthereum";
import {
  useGetAccessToken,
  useSetAccessToken,
  useTokenPayload,
} from "@/app/hook/useAccessToken";
import useUserStore from "@/app/zustands/userStore";

const SignIn = () => {
  const router = useRouter();
  const [showButton, setShowButton] = React.useState(true);
  const { setStateUser } = useUserStore();

  // Use context for error variable
  const context = React.useContext(DataContext);
  if (!context) {
    return <div>Loading...</div>; // Kiểm tra nếu context không tồn tại
  }
  const { errorEmail, errorPassword } = context.errorGlobal;

  // Call api /auth/login with axios when user signin
  const authUserSignIn = async (data: IUserSignIn) => {
    try {
      const response = await authJwtLogin(data);
      if (response) {
        const { access_token, refresh_token } = response;
        // Handle signin page route
        // Save access_token into localStorage
        await Promise.all([
          useSetAccessToken("access_token", access_token),
          useSetAccessToken("refresh_token", refresh_token),
        ]);
        const walletAddress = await getAccountWallet(access_token);
        if (walletAddress) {
          await useProvideEthUser(walletAddress.publicKey);
          // Ký thông báo bằng khóa riêng tư để thêm 1 lớp xác thực người dùng
          const checkWallet = await useVerifyWallet(walletAddress.privateKey);
          if (checkWallet !== undefined && checkWallet !== null) {
            const user = await getAccount(access_token);
            if (user) {
              const { userId, email, isActive, role } = user;
              const blockHash = await useStoreUserSession(walletAddress,email,"IGNORE", "SIGNIN");
              console.log(blockHash);
              setStateUser(userId, email, isActive, role);
              router.push("/dashboard-page");
            } else console.error("GetAccount failed!.");
          } else console.error("GetAccountWallet failed!.");
        }
      } else console.error("AuthJwtLogin failed!.");
    } catch (error) {
      console.error("Signin-page authUserSignIn failed:", error);
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
