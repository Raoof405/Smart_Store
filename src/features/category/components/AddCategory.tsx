import { Add, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { axiosIns } from "@/app/config/axios/axios";
interface categorie {
  id: number;
  name: string;
}
interface PropsType {}
export default function AddCategory({}: PropsType) {
  const [imageUrl, setImageUrl] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
  }>({
    name: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelsubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axiosIns
      .post(`/dashboard/category/store`, formData)
      .then((res) => {
        console.log(res.data);

        console.log(formData);
        console.log(res);
        toast.success("تمت الاضافة بنجاح");

        window.location.reload();
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">
        إضافة شركة جديدة
        <Add />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={open}>
        <form onSubmit={handelsubmit}>
          <Box
            display={"flex"}
            paddingRight={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <DialogTitle>إضافة شركة</DialogTitle>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <DialogContent>
            <Box className="grid grid-cols-6" paddingY={2} gap={2}>
              <TextField
                required
                name="name"
                type="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-4"
                id="outlined-basic1"
                label="اسم الشركة "
                variant="outlined"
              />

              {/* لرفع الصورة  */}
              {/* <div className="col-span-12 md:col-span-6">
                <Controller
                  control={control}
                  name="image"
                  render={({ field, fieldState }) => (
                    <Upload
                      {...field}
                      onChangeUrl={(e) => {
                        setImageUrl(e);
                      }}
                      url={imageUrl}
                    ></Upload>
                  )}
                />
              </div> */}
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
                  className=" col-span-12 md:col-span-12 "
                  variant="contained"
                  type="submit"
                >
                  حفظ
                </Button>
              )}
            </Box>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

// <Controller
//               name="name"
//               rules={{ required: true }}
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   className="col-span-12 md:col-span-6"
//                   {...field}
//                   label="اسم المنتج"
//                 ></TextField>
//               )}
//             />
//             <Controller
//               name="brandId"
//               control={control}
//               render={({ field }) => (
//                 <FormControl className="col-span-12 md:col-span-6">
//                   <InputLabel id="brandid">الشركة المصنعة</InputLabel>
//                   <Select {...field} label="الشركة المصنعة" labelId="brandid">
//                     {/* {props.brands.map((b) => (
//                       <MenuItem value={b.id} key={b.id}>
//                         {b.name}
//                       </MenuItem>
//                     ))} */}
//                     <MenuItem>jjj</MenuItem>
//                     <MenuItem>jjj</MenuItem>
//                     <MenuItem>jjj</MenuItem>
//                   </Select>
//                 </FormControl>
//               )}
//             />

//             <Controller
//               name="categoryId"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <FormControl className="col-span-12 md:col-span-3">
//                   <InputLabel id="carCategory">تصنيف الكاميرا</InputLabel>
//                   <Select
//                     {...field}
//                     label="الكاميرات المرتبطة بالقطعة"
//                     labelId="carCategory"
//                   >
//                     {props.categories.map((p) => (
//                       <MenuItem value={p.id} key={p.id}>
//                         {p.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               )}
//             />
//             <Controller
//               rules={{ required: "يرجى اختيار الرف الذي تتوفر فيه القطعة" }}
//               name="storeId"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <FormControl className="col-span-12 md:col-span-3">
//                   <InputLabel id="storId">إضافة رف</InputLabel>
//                   <Select {...field} label="إضافة رف" labelId="storId">
//                     {props.inventories.map((p) => (
//                       <MenuItem value={p.id} key={p.id}>
//                         {p.location}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               )}
//             />

//             <Controller
//               name="sellingPrice"
//               rules={{ required: true }}
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   type="number"
//                   className="col-span-12 md:col-span-3"
//                   {...field}
//                   label="سعر المبيع"
//                 ></TextField>
//               )}
//             />
//             <Controller
//               name="quantity"
//               rules={{ required: true }}
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   type="number"
//                   className="col-span-12 md:col-span-3"
//                   {...field}
//                   label="الكمية"
//                 ></TextField>
//               )}
//             />

//             <Controller
//               name="description"
//               rules={{ required: true }}
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   multiline
//                   rows={3}
//                   className="col-span-12 md:col-span-6"
//                   {...field}
//                   label="الوصف"
//                 ></TextField>
//               )}
//             />
