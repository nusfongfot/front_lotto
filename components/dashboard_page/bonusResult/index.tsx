import { listBonusDetail, listDate } from "@/api/bonus";
import { dataFromGLO } from "@/api/lotto";
import DataGridService from "@/components/service_ui/datagrid";
import { successToast } from "@/utils/notification";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
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

export default function BonusResult() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [details, setDetails] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async (date: string) => {
    setOpen(true);
    try {
      const res = await listBonusDetail(date);
      console.log('res',res)
      setDetails(res.data);
    } catch (error) {
      return error;
    }
  };

  const getDateList = async () => {
    try {
      const res = await listDate();
      const newData = res.data.map((item: any, i: any) => {
        return {
          id: i + 1,
          ...item,
        };
      });
      setRows(newData);
    } catch (error) {
      return error;
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFetchBonus = async () => {
    try {
      await dataFromGLO();
      getDateList();
      successToast("ดึงข้อมูลสำเร็จ", 1500);
    } catch (error) {
      return error;
    }
  };

  const columns = [
    {
      field: "bonusDate",
      headerName: "งวดวันที่",
      flex: 1,
      renderCell: ({ row }: any) => (
        <>{dayjs(row.bonusDate).format("YYYY-MM-DD")}</>
      ),
    },

    {
      field: "action",
      headerName: "ดูข้อมูล",
      flex: 1,
      renderCell: ({ row }: any) => (
        <>
          <Button
            variant='contained'
            size='small'
            onClick={() => handleClickOpen(row.bonusDate)}
          >
            ดูข้อมูล
          </Button>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    getDateList();
  }, []);

  return (
    <div>
      <Typography variant='h5'>ผลรางวัล</Typography>
      <Button
        variant='contained'
        size='small'
        onClick={handleFetchBonus}
        sx={{ mt: 2, mb: 2 }}
      >
        ดึงผลรางวัลจาก API
      </Button>

      <DataGridService rows={rows} columns={columns} />

      {open && (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
          maxWidth='md'
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
            ข้อมูลผลรางวัล
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
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>เลขที่ออก</TableCell>
                    <TableCell>ผลรางวัล</TableCell>
                    <TableCell>รางวัลที่</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.map((row: any, i: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.number}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {numberWithComma(row.price)}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {row.priceName}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </BootstrapDialog>
      )}
    </div>
  );
}
