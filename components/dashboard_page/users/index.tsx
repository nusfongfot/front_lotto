import { createUsers, deleteUser, getUsers } from "@/api/user";
import DataGridService from "@/components/service_ui/datagrid";
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
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { errorToast, successToast } from "@/utils/notification";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Users() {
  const [rows, setRows] = React.useState<any[]>([]);

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    email: "",
    level: "user",
    name: "",
    phone: "",
    user: "",
    password: "",
  });

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGetUsers = async () => {
    try {
      const res = await getUsers();
      setRows(res.data);
    } catch (error) {
      return error;
    }
  };

  const handleClickOpen = (item: any) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({
      email: "",
      level: "",
      name: "",
      phone: "",
      user: "",
      password: "",
    });
  };

  const handleSave = async () => {
    try {
      const res = await createUsers(values);
      if (res?.data?.id !== undefined) {
        handleGetUsers();
        successToast("เพิ่มผู้ใช้สำเร็จ", 1000);
      }
    } catch (error: any) {
      errorToast(error.message, 1500);
    } finally {
      setOpen(false);
      setValues({
        email: "",
        level: "",
        name: "",
        phone: "",
        user: "",
        password: "",
      });
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (confirm()) {
      await deleteUser(id);
      handleGetUsers();
      successToast("ลบผู้ใช้สำเร็จ", 1000);
    }
  };

  React.useEffect(() => {
    handleGetUsers();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ชื่อ",
      width: 200,
      sortable: false,
    },
    {
      field: "user",
      headerName: "username",
      width: 200,
      sortable: false,
    },
    {
      field: "level",
      headerName: "Level",
      width: 200,
      sortable: false,
    },
    {
      field: "email",
      headerName: "email",
      width: 200,
      sortable: false,
    },
    {
      field: "phone",
      headerName: "เบอร์",
      width: 200,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "จัดการ",
      width: 245,
      sortable: false,
      renderCell: ({ row }: any) => (
        <>
          <Button
            variant='contained'
            size='small'
            color='error'
            onClick={() => handleDeleteUser(row.id)}
          >
            ลบผู้ใช้
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <Typography variant='h5'>ผู้ใช้งานระบบ</Typography>
      <Button
        variant='contained'
        size='small'
        sx={{ width: 200, mt: 1, mb: 2 }}
        onClick={handleClickOpen}
      >
        เพิ่มผู้ใช้
      </Button>
      <DataGridService rows={rows} columns={columns} />

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='md'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          บันทึกการจัดส่ง
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

        <DialogContent dividers sx={{ width: 400 }}>
          <Typography>ชื่อ</Typography>
          <TextField
            size='small'
            fullWidth
            value={values.name}
            name='name'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeValues(e)
            }
          />

          <Typography>username</Typography>
          <TextField
            size='small'
            fullWidth
            value={values.user}
            name='user'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeValues(e)
            }
          />
          <Typography>password</Typography>
          <TextField
            type='password'
            size='small'
            fullWidth
            value={values.password}
            name='password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeValues(e)
            }
          />
          <Typography>email</Typography>
          <TextField
            size='small'
            fullWidth
            value={values.email}
            name='email'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeValues(e)
            }
          />
          <Typography>เบอร์</Typography>
          <TextField
            size='small'
            fullWidth
            value={values.phone}
            name='phone'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeValues(e)
            }
          />
          <Typography>level</Typography>
          <TextField
            size='small'
            fullWidth
            value={values.level}
            name='level'
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
      </BootstrapDialog>
    </div>
  );
}
