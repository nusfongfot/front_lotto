import { changePriceLotto, getLottosListForSale } from "@/api/lotto";
import DataGridService from "@/components/service_ui/datagrid";
import { Button, TextField, Typography } from "@mui/material";
import * as React from "react";

export default function ChangePrice() {
  const [rows, setRows] = React.useState<any[]>([]);

  const handleGetLottos = async () => {
    try {
      const res = await getLottosListForSale();
      setRows(res.data);
    } catch (error) {
      return error;
    }
  };

  const handleSave = async () => {
    try {
      const arr = [];
      for (let i = 0; i < rows.length; i++) {
        const item = rows[i];
        if (item?.newPrice !== undefined) {
          arr.push(item);
        }
      }
      const res = await changePriceLotto(arr);
      handleGetLottos();
      console.log("res", res, arr);
    } catch (error) {
      return error;
    }
  };

  const handleChangeNewPrice = (number: string, newPrice: string) => {
    const newArry = [];
    for (let i = 0; i < rows.length; i++) {
      const item = rows[i];
      if (item.number == number) {
        item.sale = Number(newPrice);
        item.newPrice = Number(newPrice);
      }
      newArry.push(item);
    }

    setRows(newArry);
  };

  React.useEffect(() => {
    handleGetLottos();
  }, []);

  const columns = [
    {
      field: "number",
      headerName: "เลข",
      flex: 1,
      sortable: false,
    },
    {
      field: "sale",
      headerName: "ราคา",
      flex: 1,
      sortable: false,
    },
    {
      field: "id2",
      headerName: "แก้ไขราคาใหม่",
      flex: 1,
      sortable: false,
      renderCell: ({ row }: any) => (
        <>
          <TextField
            size='small'
            onChange={(e) => handleChangeNewPrice(row.number, e.target.value)}
            sx={{ mt: 0.5 }}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Typography variant='h5'>ปรับราคาเร่งด่วน</Typography>
      <Button
        variant='contained'
        size='small'
        sx={{ width: 200, mt: 1, mb: 2 }}
        onClick={handleSave}
      >
        แก้ไขราคา
      </Button>
      <DataGridService rows={rows} columns={columns} />
    </div>
  );
}
