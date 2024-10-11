
// "use client"
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import getDashboardTheme from '@/app/theme/getDashboardTheme';
// import Header from '../components/Header';
// import MainGrid from '../components/MainGrid';
// import SideMenu from '../components/SideMenu';
// import Container from '@mui/material/Container';
// import { styled } from "@mui/system";


// const SignUpContainer = styled(Stack)(({ theme }) => ({
//   height: "100%",
//   padding: 4,
//   backgroundImage:
//     "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
//   backgroundRepeat: "no-repeat",
//   ...theme.applyStyles("dark", {
//     backgroundImage:
//       "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
//   }),
// }));

// export default function Dashboard() {

//   return (
//     <SignUpContainer
//     direction="column"
//     justifyContent="space-between"
//     sx={{
//       py: { xs: 8, sm: 16 },
//     }}
//   >
//        <Container id="features" >
//         {/* <Navbar mode={mode} toggleColorMode={toggleColorMode} /> */}
//         {/* Main content */}
//         {/* <Box
//           component="main"
//           sx={(theme) => ({
//             position: { sm: 'relative', md: '' },
//             top: { sm: '48px', md: '0' },
//             height: { sm: 'calc(100vh - 48px)', md: '100vh' },
//             flexGrow: 1,
//             pt: 2,
//             backgroundColor: alpha(theme.palette.background.default, 1),
//             overflow: 'auto',
//           })}
//         > */}
//           <Stack
//             spacing={2}
//             sx={{
//               alignItems: 'center',
//               mx: 3,
//               pb: 10,
//             }}
//           >
//             <Header/>
//             <MainGrid />
//           </Stack>
//         {/* </Box> */}
//         </Container>
//       </SignUpContainer>
//   );
// }























"use client"
import * as React from 'react';
import {
  alpha,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from '../components/Header';
import MainGrid from '../components/MainGrid';
import SideMenu from '../components/SideMenu';
import { styled } from "@mui/system";


export default function Dashboard() {

  return (
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        {/* <Navbar mode={mode} toggleColorMode={toggleColorMode} /> */}
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            position: { sm: 'relative', md: '' },
            top: { sm: '48px', md: '0' },
            height: { sm: 'calc(100vh - 48px)', md: '100vh' },
            flexGrow: 1,
            pt: 2,
            backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 10,
            }}
          >
            <Header/>
            <MainGrid />
          </Stack>
        </Box>
      </Box>
  );
}

























































































// "use client"
// import * as React from 'react';
// import {
//   PaletteMode,
//   createTheme,
//   ThemeProvider,
//   alpha,
// } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import getDashboardTheme from '@/app/theme/getDashboardTheme';
// import Header from '../components/Header';
// import MainGrid from '../components/MainGrid';
// import SideMenu from '../components/SideMenu';

// export default function Dashboard() {
//   const [mode, setMode] = React.useState<PaletteMode>('light');
//   const [showCustomTheme, setShowCustomTheme] = React.useState(true);
//   const dashboardTheme = createTheme(getDashboardTheme(mode));
//   const defaultTheme = createTheme({ palette: { mode } });

//   return (
//     <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
//       <CssBaseline />
//       <Box sx={{ display: 'flex' }}>
//         <SideMenu />
//         {/* <Navbar mode={mode} toggleColorMode={toggleColorMode} /> */}
//         {/* Main content */}
//         <Box
//           component="main"
//           sx={(theme) => ({
//             position: { sm: 'relative', md: '' },
//             top: { sm: '48px', md: '0' },
//             height: { sm: 'calc(100vh - 48px)', md: '100vh' },
//             flexGrow: 1,
//             pt: 2,
//             backgroundColor: alpha(theme.palette.background.default, 1),
//             overflow: 'auto',
//           })}
//         >
//           <Stack
//             spacing={2}
//             sx={{
//               alignItems: 'center',
//               mx: 3,
//               pb: 10,
//             }}
//           >
//             <Header/>
//             <MainGrid />
//           </Stack>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }
