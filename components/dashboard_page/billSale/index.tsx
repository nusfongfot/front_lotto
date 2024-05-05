import { confirmPay, deleteBillSale, getBillSales } from "@/api/lotto";
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
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { numberWithComma } from "@/utils/numberWithComma";
import { successToast } from "@/utils/notification";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function BillSale() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [details, setDetails] = React.useState<any>({});
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    payRemark: "",
  });
  const [payDate, setPayDate] = React.useState<any>(null);
  const [payTime, setPayTime] = React.useState<any>(null);
  const [payAlertDate, setPayAlertDate] = React.useState<any>(null);

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

  const handleGetBills = async () => {
    try {
      const res = await getBillSales();
      setRows(res.data);
    } catch (error) {
      return error;
    }
  };

  const handleDeleteBill = async (id: number) => {
    try {
      if (confirm()) {
        const res = await deleteBillSale(id);
        if (res.message == "delete successfully") {
          successToast("delete successfully", 1000);
          handleGetBills();
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handlePay = async () => {
    try {
      const body = {
        billId: details.id,
        payTime: payTime.$d,
        payDate: payDate.$d,
        payAlertDate: payAlertDate.$d,
        payRemark: values.payRemark,
      };
      const res = await confirmPay(body);
      if (res.message == "update successfully") {
        successToast("update successfully", 1000);
        handleGetBills();
      }
    } catch (error) {
      return error;
    } finally {
      setOpen(false);
      setPayAlertDate(null);
      setPayDate(null);
      setPayTime(null);
      setValues({
        payRemark: "",
      });
    }
  };

  const columns = [
    {
      field: "createdAt",
      headerName: "วันที่ทำรายการ",
      width: 140,
      renderCell: ({ row }: any) => (
        <>{dayjs(row.createdAt).format("YYYY-MM-DD HH:mm")}</>
      ),
    },
    {
      field: "customerName",
      headerName: "ลูกค้า",
      width: 140,
    },
    {
      field: "customerPhone",
      headerName: "เบอร์โทร",
      width: 100,
    },
    {
      field: "customerAddress",
      headerName: "ที่อยู่",
      width: 480,
    },
    {
      field: "payDate",
      headerName: "วันที่ชำระ",
      width: 140,
      renderCell: ({ row }: any) => (
        <>
          {row.payDate ? (
            <>
              {dayjs(row.payDate).format("YYYY-MM-DD")}
              {" "}
              {dayjs(row.payTime).format("HH:mm")}
            </>
          ) : (
            ""
          )}
        </>
      ),
    },

    {
      field: "id",
      headerName: "จัดการ",
      width: 245,
      renderCell: ({ row }: any) => (
        <Stack gap={2} flexDirection={"row"} alignItems={"center"} mt={1}>
          <Button
            variant='contained'
            size='small'
            onClick={() => handleClickOpen(row)}
          >
            รายละเอียด
          </Button>
          <Button
            variant='contained'
            size='small'
            color='error'
            onClick={() => handleDeleteBill(row.id)}
          >
            ยกเลิกคำสั่งซื้อ
          </Button>
        </Stack>
      ),
    },
  ];

  React.useEffect(() => {
    handleGetBills();
  }, []);

  return (
    <Box>
      <Typography variant='h5'>รายการสั่งซื้อ</Typography>
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

            <Stack mt={2} flexDirection={"row"} gap={2}>
              <Box>
                <Typography>วันที่ชำระ</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    value={payDate}
                    onChange={(e) => setPayDate(e)}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <Typography>เวลาที่ชำระ</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    ampm={false}
                    timeSteps={{ minutes: 1 }}
                    slotProps={{ textField: { size: "small" } }}
                    value={payTime}
                    onChange={(e) => setPayTime(e)}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <Typography>วันที่แจ้ง</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    value={payAlertDate}
                    onChange={(e) => setPayAlertDate(e)}
                  />
                </LocalizationProvider>
              </Box>
            </Stack>

            <Box>
              <Typography>หมายเหตุ</Typography>
              <TextField
                size='small'
                fullWidth
                value={values.payRemark}
                name='payRemark'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeValues(e)
                }
              />
            </Box>

            <DialogActions sx={{ mt: 2 }}>
              <Button
                variant='contained'
                size='small'
                color='success'
                onClick={handlePay}
              >
                ยืนยันการชำระ
              </Button>
            </DialogActions>
          </DialogContent>
        </BootstrapDialog>
      )}
    </Box>
  );
}
