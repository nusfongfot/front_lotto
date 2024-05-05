import DataGridService from "@/components/service_ui/datagrid";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import CreateIcon from "@mui/icons-material/Create";
import { createLotto, deleteLotto, editLotto, getLottos } from "@/api/lotto";
import { successToast } from "@/utils/notification";

type Props = {};

export default function Lotto({}: Props) {
  const [rows, setRows] = React.useState<any[]>([]);
  const [lotto, setLotto] = React.useState<any>({});
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [isDis, setIsDis] = React.useState<boolean>(true);
  const [values, setValues] = React.useState({
    number: "",
    roundNumber: "",
    bookNumber: "",
    cost: "",
    sale: "",
  });

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGetLottos = async () => {
    try {
      const res = await getLottos();
      setRows(res.data);
    } catch (error) {
      return error;
    }
  };

  const handleCreateLotto = async () => {
    try {
      const res = await createLotto(values);
      if (res.data) {
        handleGetLottos();
        successToast("add lotto successfully", 1500);
      }
    } catch (error) {
      return error;
    }
  };

  const handleEditLotto = (item: any) => {
    setLotto(item);
    setIsEdit(true);
  };

  const handleEditLottoAPI = async () => {
    try {
      const res = await editLotto(lotto.id, values);
      if (res.data) {
        successToast("edit successfully", 1000);
        handleGetLottos();
      }
    } catch (error) {
      return error;
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteLotto(id);
      successToast("delete successfully", 1000);
      handleGetLottos();
    } catch (error) {
      return error;
    }
  };

  const columns = [
    {
      field: "number",
      headerName: "เลข",
      width: 200,
    },
    {
      field: "bookNumber",
      headerName: "เล่มที่",
      width: 200,
    },
    {
      field: "roundNumber",
      headerName: "งวดที่",
      width: 150,
    },
    {
      field: "cost",
      headerName: "ราคาทุน",
      width: 100,
    },
    {
      field: "sale",
      headerName: "ราคาจำหน่าย",
      width: 150,
    },
    {
      field: "isInStock",
      headerName: "สถานะ",
      width: 200,
      renderCell: ({ row }: any) => (
        <>
          {row.isInStock ? (
            <h4 style={{ color: "red" }}>ยังไม่ขาย</h4>
          ) : (
            <h4 style={{ color: "green" }}>ขายไปแล้ว</h4>
          )}
        </>
      ),
    },

    {
      field: "id",
      headerName: "จัดการ",
      width: 228,
      renderCell: ({ row }: any) => (
        <Stack gap={2} flexDirection={"row"} alignItems={"center"} mt={1}>
          <Button
            variant='contained'
            size='small'
            onClick={() => handleEditLotto(row)}
          >
            <CreateIcon />
          </Button>
          <Button
            variant='contained'
            size='small'
            color='error'
            onClick={() => handleDeleteItem(row.id)}
          >
            X
          </Button>
        </Stack>
      ),
    },
  ];

  React.useEffect(() => {
    handleGetLottos();
  }, []);

  React.useMemo(() => {
    if (lotto && isEdit) {
      setValues({
        number: lotto.number,
        roundNumber: lotto.roundNumber,
        bookNumber: lotto.bookNumber,
        cost: lotto.cost,
        sale: lotto.sale,
      });
    }
  }, [lotto]);

  React.useMemo(() => {
    if (
      values.number == "" ||
      values.bookNumber == "" ||
      values.cost == "" ||
      values.roundNumber == "" ||
      values.sale == ""
    ) {
      setIsDis(true);
    } else {
      setIsDis(false);
    }
  }, [values]);

  return (
    <Box>
      <Box>
        <Typography variant='h5'>ข้อมูลลอตเตอรี่</Typography>
        <Stack flexDirection={"row"} gap={2} mt={2} alignItems={"center"}>
          <Box>
            <Typography>เลข</Typography>
            <TextField
              size='small'
              autoFocus
              value={values.number}
              name='number'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeValues(e)
              }
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Box>
          <Box>
            <Typography>เล่มที่</Typography>
            <TextField
              size='small'
              value={values.bookNumber}
              name='bookNumber'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeValues(e)
              }
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Box>
          <Box>
            <Typography>งวดที่</Typography>
            <TextField
              size='small'
              value={values.roundNumber}
              name='roundNumber'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeValues(e)
              }
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Box>
          <Box>
            <Typography>ราคาทุน</Typography>
            <TextField
              size='small'
              value={values.cost}
              name='cost'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeValues(e)
              }
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Box>
          <Box>
            <Typography>ราคาจำหน่าย</Typography>
            <TextField
              size='small'
              value={values.sale}
              name='sale'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeValues(e)
              }
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Box>

          <Box mt={3}>
            <Button
              variant='contained'
              size='small'
              onClick={isEdit ? handleEditLottoAPI : handleCreateLotto}
              disabled={isDis}
            >
              Save
            </Button>
          </Box>
        </Stack>
      </Box>
      <Box mt={4}>
        <DataGridService rows={rows} columns={columns} />
      </Box>
    </Box>
  );
}
