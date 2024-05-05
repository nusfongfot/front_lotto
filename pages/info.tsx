import useInfo from "@/zustand/auth";
import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import * as React from "react";

export default function InfoPage() {
  const { accInfo } = useInfo();

  return (
    <Box>
      <Head>
        <title>BBG Lotto</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container maxWidth='md'>
        <Typography align='center' mt={2} variant='h5'>
          ข้อมูลส่วนตัว
        </Typography>

        <Paper sx={{ p: 2 }}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Typography variant='h6'>ชื่อ</Typography>
            <Typography variant='h6'>{accInfo.name}</Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 2, mt: 1, mb: 2 }} />
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Typography variant='h6'>เบอร์โทร</Typography>
            <Typography variant='h6'>{accInfo.phone}</Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 2, mt: 1, mb: 2 }} />
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Typography variant='h6'>อีเมล</Typography>
            <Typography variant='h6'>{accInfo.email}</Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 2, mt: 1, mb: 2 }} />
        </Paper>
      </Container>
    </Box>
  );
}