import { Close, Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

import { toast } from "react-toastify";

import { axiosIns } from "@/app/config/axios/axios";
// Define the type for individual items
interface category {
  id: number;
  name: string;
}
// Define the type for the API response
interface ApiResponse {
  data: category;
  links: Record<string, any>;
  meta: Record<string, any>;
}
interface PropsType {
  id: number;
}
export default function DeleteCategory({ id }: PropsType) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    axiosIns
      .post(`/dashboard/category/destroy/${id}`)
      .then((res) => {
        console.log(res);
        toast(`تمت حذف القطعة بنجاح`, {
          theme: "light",
          type: "success",
        });
        setOpen(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleShow = () => setOpen(true);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outlined">
        <Delete />
      </Button>
      <Dialog maxWidth="xs" fullWidth open={open}>
        <Box
          display={"flex"}
          paddingRight={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <DialogTitle>هل انت متأكد من حذف الشركة ؟</DialogTitle>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        <DialogContent>
          <Box className="grid grid-cols-12" paddingY={2} gap={2}>
            {id}
            <Button
              className="col-span-12 md:col-span-12"
              variant="contained"
              onClick={handleClose}
            >
              تأكيد
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
