import { BrandItem } from "@/api/Brand/dto";
import { GetAllCar } from "@/api/Car/dto";
import { CategoryItem } from "@/api/Category/dto";
import { WarehouseItem } from "@/api/Warehouse/dto";
import { PartApi } from "@/api/Part";
import { AddPartDTO } from "@/api/Part/AddPartDto";
import { Add, Close, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueries, useQueryClient } from "react-query";
import Upload from "@/shared/components/Upload";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { axiosIns } from "@/app/config/axios/axios";

interface PropsType {
  id: number;
}
export default function DeleteWorker({ id }: PropsType) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    axiosIns
      .post(`/dashboard/user/destroy/${id}`)
      .then((res) => {
        window.location.reload();
        console.log(res);
        toast(`تمت حذف العامل بنجاح`, {
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
      <Button onClick={() => setOpen(true)} variant="text">
        <Delete className="text-white" />
      </Button>
      <Dialog maxWidth="xs" fullWidth open={open}>
        <Box
          display={"flex"}
          paddingRight={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <DialogTitle>هل انت متأكد من حذف العامل ؟</DialogTitle>
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
