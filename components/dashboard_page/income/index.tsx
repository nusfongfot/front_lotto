import { Box, Button, Stack, Typography } from "@mui/material";
import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getIncomes } from "@/api/billSale";
import dayjs from "dayjs";
import DataGridService from "@/components/service_ui/datagrid";
import { numberWithComma } from "@/utils/numberWithComma";

export default function Income() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [startDate, setStartDaate] = React.useState<any>(null);
  const [endDate, setEndDate] = React.useState<any>(null);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const handleGetInComes = async () => {
    try {
      const res = await getIncomes(startDate, endDate);
      const calculateTotal = res.data.reduce(
        (acc: any, val: any) => acc + val.lotto.sale,
        0
      );
      setRows(res.data);
      setTotalPrice(calculateTotal);
    } catch (error) {
      return error;
    }
  };
  const columns = [
    {
      field: "lotto",
      headerName: "เลข",
      width: 80,
      sortable:false,
      renderCell: ({ row }: any) => <>{row.lotto.number}</>,
    },
    {
      field: "total",
      headerName: "ยอดเงิน",
      width: 100,
      renderCell: ({ row }: any) => <>{row.lotto.sale}</>,
    },
    {
      field: "none1",
      headerName: "วันที๋โอน",
      width: 150,
      renderCell: ({ row }: any) => (
        <>{dayjs(row.billSale.payDate).format("YYYY-MM-DD HH:mm")}</>
      ),
    },
    {
      field: "none2",
      headerName: "ลูกค้า",
      width: 150,
      renderCell: ({ row }: any) => <>{row.billSale.customerName}</>,
    },
    {
      field: "none3",
      headerName: "เบอร์",
      width: 110,
      renderCell: ({ row }: any) => <>{row.billSale.customerPhone}</>,
    },
    {
      field: "none4",
      headerName: "ที่อยู่",
      width: 637,
      renderCell: ({ row }: any) => <>{row.billSale.customerAddress}</>,
    },
  ];

  return (
    <div>
      <Typography variant='h5'>รายงานรายได้</Typography>
      <Stack flexDirection={"row"} sx={{ maxWidth: 600, mt: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='startDate'
            slotProps={{ textField: { size: "small" } }}
            value={startDate}
            onChange={(e) => setStartDaate(e)}
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='endDate'
            slotProps={{ textField: { size: "small" } }}
            value={endDate}
            onChange={(e) => setEndDate(e)}
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>
        <Button variant='contained' size='small' onClick={handleGetInComes}>
          Send
        </Button>
      </Stack>
      <Typography variant='h5' mt={2}>{`ยอดเงิน :${numberWithComma(
        totalPrice
      )}`}</Typography>
      <Box mt={2}>
        <DataGridService rows={rows} columns={columns} />
      </Box>
    </div>
  );
}
