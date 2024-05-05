import { deleteBanner, getImageBanner, uploadFileBanner } from "@/api/banner";
import { successToast } from "@/utils/notification";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";

type Props = {};

export default function Banner({}: Props) {
  const [rows, setRows] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleGetListImages = async () => {
    try {
      const res = await getImageBanner();
      setRows(res.data);
    } catch (error) {
      return error;
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      const res = await uploadFileBanner(formData);
      if (res?.file != null) {
        handleGetListImages();
        successToast("upload success", 1500);
        setSelectedFile(null);
      }
    } catch (e) {
      return e;
    }
  };

  const showImages = (path: string) => {
    const fullPath =
      process.env.NEXT_PUBLIC_BASEURL_PATH_IMAGE + "uploads/" + path;
    return (
      <img
        src={fullPath}
        style={{
          height: 150,
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  };

  const handleRemove = async (id: number) => {
    try {
      if (confirm()) {
        const res = await deleteBanner(id);
        if (res.message == "success") {
          handleGetListImages();
          successToast("remove success", 1500);
        }
      }
    } catch (error) {
      return error;
    }
  };

  React.useEffect(() => {
    handleGetListImages();
  }, []);

  return (
    <div>
      <Typography variant='h5'>จัดการโฆษณา</Typography>
      <Box mt={2} display={"flex"} flexDirection={"column"} maxWidth={500}>
        <TextField
          type='file'
          size='small'
          inputProps={{ accept: "image/png, image/gif, image/jpeg" }}
          onChange={onFileChange}
        />
        <Button
          variant='contained'
          size='small'
          onClick={handleSave}
          sx={{ mt: 2 }}
          disabled={selectedFile == null}
        >
          ยืนยัน
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>รูปภาพ</TableCell>
                <TableCell>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any, i: any) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {showImages(row.path)}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Box>
                      <Button
                        size='small'
                        variant='contained'
                        color='error'
                        onClick={() => handleRemove(row.id)}
                      >
                        x
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
