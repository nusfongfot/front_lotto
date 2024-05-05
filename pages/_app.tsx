import { getInfoOfUser } from "@/api/user";
import AlertDialogLogin from "@/components/dialog_login";
import ResponsiveAppBar from "@/components/navbar";
import "@/styles/globals.css";
import useInfo from "@/zustand/auth";
import { getCookie } from "cookies-next";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const { setInfo, accInfo } = useInfo();

  useEffect(() => {
    (async () => {
      try {
        if (getCookie("tokenLotto") != undefined) {
          const res = await getInfoOfUser();
          setInfo(res.data);
        }
      } catch (error) {
        return error;
      }
    })();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <AlertDialogLogin />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
