"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { styled } from '@mui/system';
import InputValidate from '../signup-page/components/InputValidate';

import  SitemarkIcon from '../../components/SitemarkIcon';

const CardCustom = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 4,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignUp() {
  const [showButton, setShowButton] = React.useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {  
    event.preventDefault();
    const form = document.getElementById('signup') as HTMLFormElement;
    // if(!form.checkValidity()){
    //   event.preventDefault();
   
    // }
    console.log(form.checkValidity())
  };


  return (
        <SignUpContainer  direction="column" justifyContent="space-between" sx={{
          py: { xs: 8, sm: 16 }
        }}>
          <Stack
            sx={{
              justifyContent: 'center',
              p: 2,
            }}
          >
            <CardCustom variant="outlined">
              <SitemarkIcon />
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
              >
                Sign up
              </Typography>
              <Box
                onClick={()=>setShowButton(false)}
                onSubmit={handleSubmit}
                component="form"
                id="signup"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >

                <InputValidate nameLable='Company Name' idLable='name' placeholder='Jon Snow' type='text'/>
                <InputValidate nameLable='Email' idLable='email' placeholder='your@email.com' type='email'/>
                <InputValidate nameLable='Password' idLable='password' placeholder='••••••' type='password'/>
                <InputValidate nameLable='Tax Code' idLable='taxcode' placeholder='0000000001' type='text'/>

                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
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
                <Typography sx={{ textAlign: 'center' }}>
                  Already have an account?{' '}
                  <span>
                    <Link
                      href="/material-ui/getting-started/templates/sign-in/"
                      variant="body2"
                      sx={{ alignSelf: 'center' }}
                    >
                      Sign in
                    </Link>
                  </span>
                </Typography>
              </Box>
              <Divider/>
            </CardCustom>
          </Stack>
        </SignUpContainer>
  );
}