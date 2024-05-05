import {
  createRecordDelivery,
  getLottoInShops,
  getLottoToSend,
} from "@/api/lotto";
import DataGridService from "@/components/service_ui/datagrid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { numberWithComma } from "@/utils/numberWithComma";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { errorToast, successToast } from "@/utils/notification";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SendItem() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [details, setDetails] = React.useState<any>({});

  const [open, setOpen] = React.useState(false);
  const [openSend, setOpenSend] = React.useState(false);
  const [sendDate, setSendDate] = React.useState<any>(null);
  const [sendTime, setSendTime] = React.useState<any>(null);
  const [values, setValues] = React.useState({
    sender: "",
    trackCode: "",
    sendPlatform: "",
    remark: "",
    shippingCost: "",
  });

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickOpen = (item: any) => {
    setDetails(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenSend = (item: any) => {
    setDetails(item);
    setOpenSend(true);
  };

  const handleCloseSend = () => {
    setOpenSend(false);
  };

  const getLottoToSends = async () => {
    try {
      const res = await getLottoToSend();
      setRows(res.data);
    } catch (error) {
      return error;
    }
  };

  const handleSave = async () => {
    try {
      const body = {
        billSaleId: details.id,
        sender: values.sender,
        sendDate: sendDate.$d,
        sendTime: sendTime.$d,
        trackCode: values.trackCode,
        sendPlatform: values.sendPlatform,
        remark: values.remark,
        shippingCost: values.shippingCost,
      };
      const res = await createRecordDelivery(body);
      if (res.data != undefined) {
        getLottoToSends();
        successToast(res.message, 1500);
      }
    } catch (error) {
      errorToast("field can not blank", 1500);
    } finally {
      setOpenSend(false);
      setValues({
        sender: "",
        trackCode: "",
        sendPlatform: "",
        remark: "",
        shippingCost: "",
      });
      setSendDate(null);
      setSendTime(null);
    }
  };
  const columns = [
    {
      field: "id",
      headerName: "เลขบิล",
      width: 249,
    },
    {
      field: "customerName",
      headerName: "ลูกค้า",
      width: 249,
    },
    {
      field: "customerPhone",
      headerName: "เบอร์โทร",
      width: 249,
    },
    {
      field: "payDate",
      headerName: "วันที่ชำระ",
      width: 249,
      renderCell: ({ row }: any) => (
        <>
          {row.payDate ? (
            <>
              {dayjs(row.payDate).format("YYYY-MM-DD")}{" "}
              {dayjs(row.payTime).format("HH:mm")}
            </>
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      field: "action",
      headerName: "จัดการ",
      width: 249,
      renderCell: ({ row }: any) => {
        return (
          <>
            <Button
              variant='contained'
              size='small'
              onClick={() => handleClickOpen(row)}
            >
              ดูเลข
            </Button>
            <Button
              variant='contained'
              color='success'
              size='small'
              onClick={() => handleClickOpenSend(row)}
              sx={{ ml: 1 }}
            >
              จัดส่ง
            </Button>
          </>
        );
      },
    },
  ];

  React.useEffect(() => {
    getLottoToSends();
  }, []);

  return (
    <div>
      <Typography variant='h5'>รายการที่ฝากร้าน</Typography>
      <DataGridService rows={rows} columns={columns} />
      {open && (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
          maxWidth='md'
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
            รายละเอียดคำสั่งซื้อ
          </DialogTitle>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers sx={{ width: 600 }}>
            <Typography gutterBottom>BillSale Id: {details.id}</Typography>
            <Typography gutterBottom>
              ลูกค้า: {details.customerName} {details.customerPhone}
            </Typography>
            <Typography gutterBottom>
              ที่อยู่ในการจัดส่ง: {details.customerAddress}
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>ลำดับ</TableCell>
                    <TableCell>เลข</TableCell>
                    <TableCell>ราคา</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.BillSaleDetail.map((row: any, i: any) => (
                    <TableRow
                      key={row.lotto.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {i + 1}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {row.lotto.number}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {row.lotto.sale}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography align='center' variant='h5' mt={2}>
              ยอดเงิน:{" "}
              {numberWithComma(
                details.BillSaleDetail.reduce(
                  (acc: any, val: any) => val.lotto.sale + acc,
                  0
                )
              )}{" "}
              บาท
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      )}

      <BootstrapDialog
        onClose={handleCloseSend}
        aria-labelledby='customized-dialog-title'
        open={openSend}
        maxWidth='md'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          บันทึกการจัดส่ง
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleCloseSend}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {details.BillSaleForSend != undefined &&
        details.BillSaleForSend.length > 0 ? (
          <DialogContent sx={{ width: 400 }}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography>ผู้จัดส่ง</Typography>
              <Typography>{details.BillSaleForSend[0].sender || ""}</Typography>
            </Stack>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography>วันที่</Typography>
              <Typography>
                {dayjs(details.BillSaleForSend[0].sendDate).format(
                  "YYYY-MM-DD"
                )}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography>เวลา</Typography>
              <Typography>
                {dayjs(details.BillSaleForSend[0].sendTime).format("HH:mm")}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography>เลขติดตาม</Typography>
              <Typography>{details.BillSaleForSend[0].trackCode}</Typography>
            </Stack>
            <Box>
              <Typography>หมายเหตุ:</Typography>
              <Typography>{details.BillSaleForSend[0].remark || ""}</Typography>
            </Box>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography>ค่าจัดส่ง</Typography>
              <Typography>{details.BillSaleForSend[0].shippingCost}</Typography>
            </Stack>
          </DialogContent>
        ) : (
          <>
            <DialogContent dividers sx={{ width: 400 }}>
              <Typography>ผู้จัดส่ง</Typography>
              <TextField
                size='small'
                fullWidth
                value={values.sender}
                name='sender'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeValues(e)
                }
              />
              <Typography>วันที่</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  value={sendDate}
                  onChange={(e) => setSendDate(e)}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
              <Typography>เวลา</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  ampm={false}
                  timeSteps={{ minutes: 1 }}
                  slotProps={{ textField: { size: "small" } }}
                  value={sendTime}
                  onChange={(e) => setSendTime(e)}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
              <Typography>เลขติดตาม</Typography>
              <TextField
                size='small'
                fullWidth
                value={values.trackCode}
                name='trackCode'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeValues(e)
                }
              />
              <Typography>ช่องทางการจัดส่ง</Typography>
              <TextField
                size='small'
                fullWidth
                value={values.sendPlatform}
                name='sendPlatform'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeValues(e)
                }
              />
              <Typography>หมายเหตุ</Typography>
              <TextField
                size='small'
                fullWidth
                value={values.remark}
                name='remark'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeValues(e)
                }
              />
              <Typography>ค่าจัดส่ง</Typography>
              <TextField
                size='small'
                fullWidth
                value={values.shippingCost}
                name='shippingCost'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeValues(e)
                }
              />
            </DialogContent>

            <DialogActions>
              <Button variant='contained' onClick={handleSave}>
                บันทึก
              </Button>
            </DialogActions>
          </>
        )}
      </BootstrapDialog>
    </div>
  );
}
