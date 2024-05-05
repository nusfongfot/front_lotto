import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/material";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertDialogLogin() {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  React.useMemo(() => {
    if (
      getCookie("tokenLotto") != undefined ||
      router.pathname == "/signup" ||
      router.pathname == "/signin" ||
      router.pathname == "/dashboard" ||
      router.pathname == "/admin"
    ) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
        maxWidth='md'
      >
        <Box sx={{ width: 400 }}>
          <DialogTitle align='center'>กรุณาล็อคอินเพื่อเข้าใช้งาน</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'></DialogContentText>
          </DialogContent>
          <DialogActions sx={{ flex: 1, justifyContent: "center" }}>
            <Button
              onClick={() => window.location.replace("/signup")}
              variant='contained'
              size='small'
              sx={{ width: 250 }}
            >
              Sign up
            </Button>
            <Button
              onClick={() => window.location.replace("/signin")}
              variant='contained'
              size='small'
              sx={{ width: 250 }}
            >
              Login
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
