import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { logIn } from "@/api/auth";
import { errorToast, successToast } from "@/utils/notification";
import { setCookie } from "cookies-next";
import useInfo from "@/zustand/auth";

const defaultTheme = createTheme();

export default function Home() {
  const router = useRouter();
  const { setInfo } = useInfo();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);
      const body = {
        email: data.get("email"),
        password: data.get("password"),
      };
      const res = await logIn(body);
      console.log("res", res);

      if (res.data) {
        setCookie("tokenLotto", res.token.access_token);
        successToast("login successfully", 1500);
        setInfo(res.data);
        router.replace({
          pathname: "dashboard",
          query: { subpath: "information" },
        });
      } else {
        errorToast(res.message, 1500);
      }
    } catch (error: any) {
      console.log("error 3", error);
      return error;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>Login</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in Admin
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
