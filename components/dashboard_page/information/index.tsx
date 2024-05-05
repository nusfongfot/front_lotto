import { createCompany, getInfoCompany } from "@/api/company";
import { successToast } from "@/utils/notification";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as React from "react";

type Props = {};

export default function Information({}: Props) {
  const [values, setValues] = React.useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveCompany = async () => {
    try {
      await createCompany(values);
      successToast("save successfully", 1000);
    } catch (error) {
      return error;
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const res = await getInfoCompany();
        if (res.data) {
          setValues({
            name: res.data.name,
            address: res.data.address,
            phone: res.data.phone,
          });
        }
      } catch (error) {
        return error;
      }
    })();
  }, []);

  return (
    <div>
      <Box>
        <Typography>ชื่อ</Typography>
        <TextField
          size='small'
          value={values.name}
          name='name'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeValues(e)
          }
        />
      </Box>
      <Box>
        <Typography>ที่อยู่</Typography>
        <TextField
          size='small'
          multiline
          minRows={4}
          maxRows={4}
          sx={{ width: 224 }}
          value={values.address}
          name='address'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeValues(e)
          }
        />
      </Box>
      <Box>
        <Typography>phone</Typography>
        <TextField
          size='small'
          value={values.phone}
          name='phone'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeValues(e)
          }
        />
      </Box>
      <Button
        size='small'
        variant='contained'
        sx={{ mt: 2 }}
        onClick={handleSaveCompany}
      >
        save
      </Button>
    </div>
  );
}
