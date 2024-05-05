import { checkBonusLotto } from "@/api/bonus";
import DataGridService from "@/components/service_ui/datagrid";
import { numberWithComma } from "@/utils/numberWithComma";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CloseIcon from "@mui/icons-material/Close";
import { createDeliveryMoney, createTransferMoney } from "@/api/billSale";
import { successToast } from "@/utils/notification";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function BonusReport() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [details, setDetails] = React.useState<any>({});

  const [openTransfer, setOpenTransfer] = React.useState(false);
  const [openDelivery, setOpenDelivery] = React.useState(false);
  const [transferMoneyDate, setTransferMoneyDate] = React.useState<any>(null);
  const [transferMoneyTime, setTransferMoneyTime] = React.useState<any>(null);
  const [values, setValues] = React.useState({
    price: "",
  });

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickOpenTransfer = (item: any) => {
    setDetails(item);
    setOpenTransfer(true);
  };

  const handleCloseTransfer = () => {
    setOpenTransfer(false);
  };

  const handleClickOpenDelivery = (item: any) => {
    setDetails(item);
    setOpenDelivery(true);
  };

  const handleCloseDelivery = () => {
    setOpenDelivery(false);
  };

  const getCheckBonusLotto = async () => {
    try {
      const res = await checkBonusLotto();
      setRows(res.data);
    } catch (error) {
      return error;
    }
  };

  const handleSaveTransfer = async () => {
    try {
      const body = {
        billSaleId: details.billSaleDetail.billSaleId,
        transferMoneyDate: transferMoneyDate.$d,
        transferMoneyTime: transferMoneyTime.$d,
        price: values.price,
      };
      const res = await createTransferMoney(body);
      if (res.message == "success") {
        successToast("บันทึกสำเร็จ", 1500);
        getCheckBonusLotto();
      }
    } catch (error) {
      return;
    } finally {
      setTransferMoneyDate(null);
      setTransferMoneyTime(null);
      setOpenTransfer(false);
      setValues({
        price: "",
      });
    }
  };

  const handleSaveDelivery = async () => {
    try {
      const body = {
        billSaleId: details.billSaleDetail.billSaleId,
        deliveryDate: transferMoneyDate.$d,
        price: values.price,
      };
      const res = await createDeliveryMoney(body);
      if (res.message == "success") {
        successToast("บันทึกสำเร็จ", 1500);
        getCheckBonusLotto();
      }
    } catch (error) {
      return;
    } finally {
      setTransferMoneyDate(null);
      setOpenDelivery(false);
      setValues({
        price: "",
      });
    }
  };

  const columns = [
    {
      field: "bonusDate",
      headerName: "งวดวันที่",
      width: 100,
      renderCell: ({ row }: any) => (
        <>{dayjs(row.bonusDate).format("YYYY-MM-DD")}</>
      ),
    },

    {
      field: "bonusName",
      headerName: "รางวัล",
      width: 100,
    },
    {
      field: "bonusPrice",
      headerName: "เงินรางวัล",
      width: 120,
      renderCell: ({ row }: any) => <>{numberWithComma(row.bonusPrice)}</>,
    },
    {
      field: "number",
      headerName: "เลขที่ออก",
      width: 110,
    },
    {
      field: "none1",
      headerName: "ชื่อผู้ซื้อ",
      width: 150,
      renderCell: ({ row }: any) => (
        <>{row.billSaleDetail.billSale.customerName}</>
      ),
    },
    {
      field: "none2",
      headerName: "เบอร์โทร",
      width: 100,
      renderCell: ({ row }: any) => (
        <>{row.billSaleDetail.billSale.customerPhone}</>
      ),
    },
    {
      field: "none3",
      headerName: "ลอตเตอรี่",
      width: 110,
      renderCell: ({ row }: any) => <>{row.billSaleDetail.lotto.number}</>,
    },
    {
      field: "none4",
      headerName: "วันที่โอนเงิน",
      width: 130,
      renderCell: ({ row }: any) => (
        <>
          {row.billSaleDetail.billSale.transferMoneyDate != null
            ? dayjs(row.billSaleDetail.billSale.transferMoneyDate).format(
                "YYYY/MM/DD"
              )
            : ""}
        </>
      ),
    },
    {
      field: "none5",
      headerName: "เวลาที่โอนเงิน",
      width: 140,
      renderCell: ({ row }: any) => (
        <>
          {row.billSaleDetail.billSale.transferMoneyTime != null
            ? dayjs(row.billSaleDetail.billSale.transferMoneyTime).format(
                "HH:mm"
              )
            : ""}
        </>
      ),
    },
    {
      field: "none6",
      headerName: "วันที่มอบเงิน",
      width: 140,
      renderCell: ({ row }: any) => (
        <>
          {row.billSaleDetail.billSale.deliveryDate != null
            ? dayjs(row.billSaleDetail.billSale.deliveryDate).format(
                "YYYY-MM-DD"
              )
            : ""}
        </>
      ),
    },
    {
      field: "none7",
      headerName: "จัดการ",
      width: 250,
      renderCell: ({ row }: any) => (
        <>
          {row.billSaleDetail.billSale.deliveryDate ||
          row.billSaleDetail.billSale.transferMoneyTime ||
          row.billSaleDetail.billSale.transferMoneyDate ? null : (
            <>
              <Button
                variant='contained'
                size='small'
                sx={{ mr: 1 }}
                onClick={() => handleClickOpenTransfer(row)}
              >
                โอนเงิน
              </Button>
              <Button
                variant='contained'
                size='small'
                color='success'
                onClick={() => handleClickOpenDelivery(row)}
              >
                นำเงินไปมอบ
              </Button>
            </>
          )}
        </>
      ),
    },
  ];
  React.useEffect(() => {
    getCheckBonusLotto();
  }, []);

  return (
    <div>
      <Typography variant='h5'>รายงานผู้ถูกรางวัล</Typography>
      <DataGridService rows={rows} columns={columns} />

      <BootstrapDialog
        onClose={handleCloseTransfer}
        aria-labelledby='customized-dialog-title'
        open={openTransfer}
        maxWidth='md'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          โอนเงิน
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleCloseTransfer}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers sx={{ width: 400 }}>
          <Typography>วันที่</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              value={transferMoneyDate}
              onChange={(e) => setTransferMoneyDate(e)}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
          <Typography>เวลา</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              ampm={false}
              timeSteps={{ minutes: 1 }}
              slotProps={{ textField: { size: "small" } }}
              value={transferMoneyTime}
              onChange={(e) => setTransferMoneyTime(e)}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
          <Typography>ยอดเงิน</Typography>
          <TextField
            size='small'
            fullWidth
            value={values.price}
            name='price'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeValues(e)
            }
          />
        </DialogContent>

        <DialogActions>
          <Button variant='contained' onClick={handleSaveTransfer}>
            บันทึก
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BootstrapDialog
        onClose={handleCloseDelivery}
        aria-labelledby='customized-dialog-title'
        open={openDelivery}
        maxWidth='md'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          นำเงินไปมอบ
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleCloseDelivery}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers sx={{ width: 400 }}>
          <Typography>วันที่</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              value={transferMoneyDate}
              onChange={(e) => setTransferMoneyDate(e)}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
          <Typography>ยอดเงิน</Typography>
          <TextField
            size='small'
            fullWidth
            value={values.price}
            name='price'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeValues(e)
            }
          />
        </DialogContent>

        <DialogActions>
          <Button variant='contained' onClick={handleSaveDelivery}>
            บันทึก
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
