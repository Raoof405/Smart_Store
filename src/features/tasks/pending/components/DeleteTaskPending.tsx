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

interface PropsType {
  id: number;
}
export default function DeleteTaskPending({ id }: PropsType) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    axiosIns
      .post(`/dashboard/task/destroy/${id}`)
      .then((res) => {
        window.location.reload();
        console.log(res);
        toast(`تمت حذف المهمة بنجاح`, {
          theme: "light",
          type: "success",
        });
        setOpen(false);
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
          <DialogTitle>هل انت متأكد من حذف المهمة ؟</DialogTitle>
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
