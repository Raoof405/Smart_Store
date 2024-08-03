import { CreateClient } from "@/api/Client/CreateClient";
import { ClientItem } from "@/api/Client/GetAll";
import { axiosIns } from "@/app/config/axios/axios";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormFields = Omit<CreateClient, "isSeller"> & { isSeller: 0 | 1 };

type Props = {
  isOpen: boolean;
  onSetOpen: (is: boolean) => void;
  // onSubmit: () => void;
  // clientDetails: ClientItem | null;
};
export default function AddWorker({ isOpen, onSetOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>("");

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    user_type: string;
  }>({
    name: "", // required
    email: "", // required
    password: "", // required
    user_type: "", // required
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleInputChangeSelect = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handelsubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axiosIns
      .post(`/dashboard/user/store`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        user_type: role,
      })
      .then((res) => {
        toast.success("تمت الاضافة بنجاح");
        window.location.reload();
        setOpen(false);
        // console.log(res.data);
        // console.log(formData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Dialog
        onClose={() => onSetOpen(false)}
        maxWidth="md"
        fullWidth
        open={isOpen}
      >
        <form onSubmit={handelsubmit}>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <DialogTitle>{"إضافة عامل"}</DialogTitle>

            <IconButton sx={{ mx: 2 }} onClick={() => onSetOpen(false)}>
              <Close></Close>
            </IconButton>
          </Box>
          <DialogContent sx={{ p: 2 }}>
            <Box className="grid grid-cols-12" paddingY={2} gap={2}>
              <TextField
                required
                name="name"
                type="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-6"
                label="اسم العامل "
                variant="outlined"
              />
              <TextField
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-6"
                label="البريد الالكتروني"
                variant="outlined"
              />
              <FormControl
                className="col-span-12 md:col-span-6"
                fullWidth
                // required
              >
                <InputLabel id="demo-simple-select-label">
                  نوع العامل
                </InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={role}
                  onChange={handleInputChangeSelect}
                  label="نوع العامل"
                  variant="outlined"
                >
                  {/* <MenuItem value="admin">Admin</MenuItem> */}
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </FormControl>

              {/* <TextField
                required
                name="user_type"
                type="text"
                value={formData.user_type}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-6"
                label="نوع العامل"
                variant="outlined"
              /> */}
              <TextField
                required
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-6"
                label="كلمة السر"
                variant="outlined"
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                onSetOpen(false);
              }}
            >
              الغاء
            </Button>
            {loading ? (
              <div
                className="flex flex-col justify-center items-center  col-span-12 md:col-span-12"
                role="status"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <Button
                sx={{ justifySelf: "flex-end" }}
                type="submit"
                variant="contained"
              >
                حفظ
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

// <Controller
//               name="name"
//               rules={{ required: "اسم العامل مطلوب" }}
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   error={fieldState.invalid}
//                   helperText={fieldState.error?.message}
//                   {...field}
//                   label="اسم العامل"
//                 />
//               )}
//             />

//             <Controller
//               name="phoneNumber"
//               rules={{ required: "رقم العاتف " }}
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   error={fieldState.invalid}
//                   helperText={fieldState.error?.message}
//                   {...field}
//                   type="number"
//                   label="رقم الهاتف"
//                 />
//               )}
//             />
//             <Controller
//               name="email"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   helperText="اختياري"
//                   {...field}
//                   value={field.value ?? ""}
//                   label="البريد الإلكتروني"
//                 />
//               )}
//             />
//             <Controller
//               name="address"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   helperText="اختياري"
//                   {...field}
//                   value={field.value ?? ""}
//                   label="العنوان"
//                 />
//               )}
//             />
