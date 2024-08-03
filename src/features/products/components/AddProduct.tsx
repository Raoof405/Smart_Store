import { Add, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
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
import { Box } from "@mui/system";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosIns } from "@/app/config/axios/axios";

interface Product {
  id: number;
  name: string;
  category: Category;
  sector: Sector;
  price: number;
  stock: number;
  min_stock: number;
}
interface Sector {
  id: number;
  name: string | null;
  corridor: any;
  camera: any;
  created_at: string;
}

interface Category {
  created_at: string;
  id: number;
  name: string;
}
interface PropsType {}
export default function AddProduct({}: PropsType) {
  // /+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [selection1, setSelection1] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | string>("");
  // /+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [selection2, setSelection2] = useState<Sector[]>([]);
  const [sectorId, setSectorId] = useState<number | string>("");

  const [imageUrl, setImageUrl] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    category_id: number;
    sector_id: number;
    price: number;
    stock: number;
    min_stock: number;
  }>({
    name: "", // required
    category_id: 0, // required
    sector_id: 0, // required
    price: 0,
    stock: 0,
    min_stock: 0,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelsubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axiosIns
      .post(`/dashboard/product/store`, {
        category_id: categoryId,
        sector_id: sectorId,
        name: formData.name,
        price: formData.price,
        stock: formData.stock,
        min_stock: formData.min_stock,
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

  //

  // ==========================================================================================
  //  to fetch selection data 1 category
  const fetchSel1 = async () => {
    try {
      const response = await axiosIns.get<{ data: Category[] }>(
        `/dashboard/category/index`
      );
      setSelection1(response.data.data);
      // console.log("+++++++++++++++++++++++++++");
      // console.log(selection1);
      setLoading(false);
    } catch (error) {
      console.log(error);

      // setError("Error fetching data");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSel1();
  }, []);
  const handleChangeselction1 = (event: SelectChangeEvent<string | number>) => {
    setCategoryId(event.target.value as number); // Update state with selected category ID
  };
  // ==========================================================================================
  //  to fetch selection data 2 sector
  const fetchSel2 = async () => {
    try {
      const response = await axiosIns.get<{ data: Sector[] }>(
        `/dashboard/sector/index`
      );
      setSelection2(response.data.data);
      // console.log("============================================");
      // console.log(selection2[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);

      // setError("Error fetching data");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSel2();
  }, []);
  const handleChangeselction2 = (event: SelectChangeEvent<string | number>) => {
    setSectorId(event.target.value as number); // Update state with selected category ID
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">
        إضافة منتج جديدة
        <Add />
      </Button>
      <Dialog maxWidth="md" fullWidth open={open}>
        <form onSubmit={handelsubmit}>
          <Box
            display={"flex"}
            paddingRight={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <DialogTitle>إضافة منتج</DialogTitle>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <DialogContent>
            <Box className="grid grid-cols-12" paddingY={2} gap={2}>
              <TextField
                required
                name="name"
                type="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-4"
                id="outlined-basic1"
                label="اسم المنتج "
                variant="outlined"
              />
              <FormControl
                className="col-span-12 md:col-span-4"
                fullWidth
                required
              >
                <InputLabel id="demo-simple-select-label">
                  اسم الشركة المصًنعة{" "}
                </InputLabel>
                <Select
                  name="category_id"
                  id="outlined-basic1"
                  label="اسم الشركة المصًنعة "
                  variant="outlined"
                  required
                  labelId="demo-simple-select-label"
                  value={categoryId}
                  onChange={handleChangeselction1}
                >
                  {selection1.map((categ) => (
                    <MenuItem key={categ.id} value={categ.id}>
                      {categ.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                className="col-span-12 md:col-span-4"
                fullWidth
                required
              >
                <InputLabel id="demo-simple-select-label">اسم الرف </InputLabel>
                <Select
                  name="sector_id"
                  type="number"
                  className="col-span-12 md:col-span-4"
                  label="اسم الرف"
                  variant="outlined"
                  required
                  labelId="demo-simple-select-label"
                  value={sectorId}
                  onChange={handleChangeselction2}
                >
                  {selection2.map((sector) => (
                    <MenuItem key={sector.id} value={sector.id}>
                      {sector.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* 
               <TextField
                required
                name="category_id"
                type="number"
                value={formData.category_id}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-4"
                id="outlined-basic1"
                label="رقم الكاتيكوري"
                variant="outlined"
              /> */}
              {/* <TextField
                required
                name="sector_id"
                type="number"
                value={formData.sector_id}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-4"
                id="outlined-basic1"
                label="رقم الرف"
                variant="outlined"
              /> */}
              <TextField
                helperText="اختياري"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-4"
                id="outlined-basic1"
                label="السعر"
                variant="outlined"
              />
              <TextField
                helperText="اختياري"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-4"
                id="outlined-basic1"
                label="الكمية الاجمالية على الرف "
                variant="outlined"
              />{" "}
              <TextField
                helperText="اختياري"
                name="min_stock"
                type="number"
                value={formData.min_stock}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-4"
                id="outlined-basic1"
                label="الحد الأدنى للكمية"
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
