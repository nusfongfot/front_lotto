import { checkLottoIsBonus, getLottoIsBonusLists } from "@/api/bonus";
import DataGridService from "@/components/service_ui/datagrid";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import * as React from "react";

export default function AwardStore() {
  const [rows, setRows] = React.useState<any[]>([]);

  const columns = [
    {
      field: "bonusDate",
      headerName: "งวดวันที่",
      sortable: false,
      width: 249,
      renderCell: ({ row }: any) => (
        <>{dayjs(row.bonusResultDetail.bonusDate).format("YYYY-MM-DD")}</>
      ),
    },
    {
      field: "none1",
      headerName: "รางวัลที่",
      sortable: false,
      width: 249,
      renderCell: ({ row }: any) => <>{row.bonusResultDetail.priceName}</>,
    },
    {
      field: "none2",
      headerName: "ผลรางวัล",
      sortable: false,
      width: 249,
      renderCell: ({ row }: any) => <>{row.bonusResultDetail.number}</>,
    },
    {
      field: "none3",
      headerName: "จำนวนเงิน",
      sortable: false,
      width: 249,
      renderCell: ({ row }: any) => <>{row.bonusResultDetail.price}</>,
    },
    {
      field: "none4",
      headerName: "ลอตเตอรี่",
      sortable: false,
      width: 249,
      renderCell: ({ row }: any) => <>{row.lotto.number}</>,
    },
  ];

  React.useEffect(() => {
    (async () => {
      try {
        await checkLottoIsBonus();
        const data = await getLottoIsBonusLists();
        setRows(data.data);
      } catch (error) {
        return error;
      }
    })();
  }, []);

  return (
    <div>
      <Typography variant='h5'>ผลรางวัลของร้าน</Typography>
      <DataGridService columns={columns} rows={rows} />
    </div>
  );
}
