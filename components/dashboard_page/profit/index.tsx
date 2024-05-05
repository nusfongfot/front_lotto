import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getProfit } from "@/api/billSale";
import dayjs from "dayjs";
import DataGridService from "@/components/service_ui/datagrid";
import { numberWithComma } from "@/utils/numberWithComma";

export default function Profit() {
  const [rowsIncomes, setRowsIncomes] = React.useState<any[]>([]);
  const [rowsBonus, setRowsBonus] = React.useState<any[]>([]);
  const [startDate, setStartDaate] = React.useState<any>(null);
  const [endDate, setEndDate] = React.useState<any>(null);
  const [totalIncome, setTotalIncome] = React.useState(0);
  const [totalBonus, setTotalBonus] = React.useState(0);
  const [totalCost, setTotalCost] = React.useState(0);

  const handleGetProfit = async () => {
    try {
      const res = await getProfit(startDate, endDate);
      const sumIncome = res.billSaleDetails.reduce(
        (acc: any, val: any) => acc + val.lotto.sale,
        0
      );
      const sumBonus = res.lottoIsBonus.reduce(
        (acc: any, val: any) => acc + val.bonusResultDetail.price,
        0
      );
      const sumCost = res.billSaleDetails.reduce(
        (acc: any, val: any) => acc + val.lotto.cost,
        0
      );
      setRowsIncomes(res.billSaleDetails);
      setRowsBonus(res.lottoIsBonus);
      setTotalIncome(sumIncome);
      setTotalBonus(sumBonus);
      setTotalCost(sumCost);
    } catch (error) {
      return error;
    }
  };
  const columnsIncomes = [
    {
      field: "date",
      headerName: "วันที่",
      flex: 1,
      sortable: false,
      renderCell: ({ row }: any) => (
        <>{dayjs(row.lotto.createdAt).format("YYYY-MM-DD HH:mm")}</>
      ),
    },
    {
      field: "total",
      headerName: "ราคาขาย",
      flex: 1,
      sortable: false,

      renderCell: ({ row }: any) => <>{row.lotto.sale}</>,
    },
    {
      field: "none1",
      headerName: "เลข",
      flex: 1,
      sortable: false,
      renderCell: ({ row }: any) => <>{row.lotto.number}</>,
    },
  ];

  const columnsBonus = [
    {
      field: "date",
      headerName: "วันที่",
      flex: 1,
      sortable: false,
      renderCell: ({ row }: any) => (
        <>{dayjs(row.bonusResultDetail.bonusDate).format("YYYY-MM-DD HH:mm")}</>
      ),
    },
    {
      field: "total",
      headerName: "ยอดเงิน",
      flex: 1,
      sortable: false,

      renderCell: ({ row }: any) => <>{row.bonusResultDetail.price}</>,
    },
    {
      field: "none1",
      headerName: "เลข",
      flex: 1,
      sortable: false,
      renderCell: ({ row }: any) => <>{row.bonusResultDetail.number}</>,
    },
  ];

  const columnsCost = [
    {
      field: "date",
      headerName: "วันที่",
      flex: 1,
      sortable: false,
      renderCell: ({ row }: any) => (
        <>{dayjs(row.lotto.createdAt).format("YYYY-MM-DD HH:mm")}</>
      ),
    },
    {
      field: "total",
      headerName: "ยอดเงิน",
      flex: 1,
      sortable: false,

      renderCell: ({ row }: any) => <>{row.lotto.cost}</>,
    },
    {
      field: "none1",
      headerName: "เลข",
      flex: 1,
      sortable: false,
      renderCell: ({ row }: any) => <>{row.lotto.number}</>,
    },
  ];

  return (
    <div>
      <Typography variant='h5'>รายงานกำไร</Typography>
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
        <Button variant='contained' size='small' onClick={handleGetProfit}>
          Send
        </Button>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Box sx={{ width: "100%" }}>
            <Typography variant='h6'>รายได้จากการขาย</Typography>
            <Alert severity='success'>{numberWithComma(totalIncome)}</Alert>
            <DataGridService rows={rowsIncomes} columns={columnsIncomes} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box sx={{ width: "100%" }}>
            <Typography variant='h6'>รายได้จากผลรางวัล</Typography>
            <Alert severity='success'>{numberWithComma(totalBonus)}</Alert>
            <DataGridService rows={rowsBonus} columns={columnsBonus} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box sx={{ width: "100%" }}>
            <Typography variant='h6'>ต้นทุนซื้อ</Typography>
            <Alert severity='error'>{numberWithComma(totalCost)}</Alert>
            <DataGridService rows={rowsIncomes} columns={columnsCost} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box sx={{ width: "100%" }}>
            <Typography variant='h6'>ผลกำไร</Typography>
            <Alert severity='info'>
              {numberWithComma(totalIncome + totalBonus - totalCost)}
            </Alert>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
