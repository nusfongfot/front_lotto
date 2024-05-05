import { getLottoInShops } from "@/api/lotto";
import DataGridService from "@/components/service_ui/datagrid";
import {
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
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { numberWithComma } from "@/utils/numberWithComma";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ItemStore() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [details, setDetails] = React.useState<any>({});
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (item: any) => {
    setDetails(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          </>
        );
      },
    },
  ];

  React.useEffect(() => {
    (async () => {
      try {
        const res = await getLottoInShops();
        setRows(res.data);
      } catch (error) {
        return error;
      }
    })();
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
    </div>
  );
}
