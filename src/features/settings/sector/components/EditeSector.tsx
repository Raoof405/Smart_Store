import { WarehouseApi } from "@/api/Warehouse";
import { AddWarehouseDto, WarehouseItem } from "@/api/Warehouse/dto";
import { axiosIns } from "@/app/config/axios/axios";
import { Add, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface Sectors {
  created_at: string;
  id: number;
  name: string | null;
  camera: Camera;
  corridor: Corridor;
}
interface Camera {
  created_at: string;
  id: number;
  ip: string;
  name: string;
}

interface Corridor {
  created_at: string;
  id: number;
  label: string;
}

interface ApiResponse {
  data: Sectors;
  links: Record<string, any>;
  meta: Record<string, any>;
}
interface PropsType {
  id: number;
}

export default function EditeSector({ id }: PropsType) {
  const [sector, setSector] = useState<Sectors | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // /+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [selection1, setSelection1] = useState<Camera[]>([]);
  const [cameraId, setCameraId] = useState<number | string>("");
  // /+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [selection2, setSelection2] = useState<Corridor[]>([]);
  const [corridorId, setCorridorId] = useState<number | string>("");

  //to fetch data in 1 row

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosIns.get<ApiResponse>(
          `/dashboard/sector/show/${id}`
        );
        setSector(response.data.data);
        setCameraId(response.data.data.camera.id);
        setCorridorId(response.data.data.corridor.id);

        // console.log(product);
      } catch (error) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sector) {
      setSector({
        ...sector,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axiosIns
      .post(`/dashboard/sector/update/${id}`, {
        name: sector?.name,
        camera_id: cameraId,
        corridor_id: corridorId,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res);
        toast.success("تمت الاضافة بنجاح");

        window.location.reload();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  // ==========================================================================================
  //  to fetch selection data 1 category
  const fetchSel1 = async () => {
    try {
      const response = await axiosIns.get<{ data: Camera[] }>(
        `/dashboard/camera/index`
      );
      setSelection1(response.data.data);
      // console.log("+++++++++++++++++++++++++++");
      // console.log(selection1);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSel1();
  }, []);
  const handleChangeselction1 = (event: SelectChangeEvent<string | number>) => {
    setCameraId(event.target.value as number);
  };
  // ==========================================================================================
  //  to fetch selection data 2 sector
  const fetchSel2 = async () => {
    try {
      const response = await axiosIns.get<{ data: Corridor[] }>(
        `/dashboard/corridor/index`
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
    setCorridorId(event.target.value as number); // Update state with selected category ID
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">
        <Edit  />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={open}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>تعديل الرف</DialogTitle>
          <DialogContent>
            <Box className="grid grid-cols-12" paddingY={2} gap={2}>
              {" "}
              <TextField
                required
                name="name"
                type="text"
                value={sector?.name}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-6"
                id="outlined-basic1"
                label="اسم الرف"
                variant="outlined"
              />
              <FormControl className="col-span-12 md:col-span-6" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  اسم الكاميرا{" "}
                </InputLabel>
                <Select
                  name="camera_id"
                  id="outlined-basic1"
                  label="رقم الكاميرا"
                  variant="outlined"
                  required
                  labelId="demo-simple-select-label"
                  value={cameraId}
                  onChange={handleChangeselction1}
                >
                  {selection1.map((cam) => (
                    <MenuItem key={cam.id} value={cam.id}>
                      {cam.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>{" "}
              <FormControl className="col-span-12 md:col-span-6" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  اسم الممر{" "}
                </InputLabel>
                <Select
                  name="corridor_id"
                  id="outlined-basic1"
                  label="رقم الممر"
                  variant="outlined"
                  required
                  labelId="demo-simple-select-label"
                  value={corridorId}
                  onChange={handleChangeselction2}
                >
                  {selection2.map((corr) => (
                    <MenuItem key={corr.id} value={corr.id}>
                      {corr.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <TextField
                required
                name="camera_id"
                type="camera_id"
                value={formData.camera_id}
                onChange={handleInputChange}
                className="col-span-12 md:col-span-3"
                id="outlined-basic1"
                label="رقم الكاميرا "
                variant="outlined"
              /> */}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              تراجع
            </Button>
            {loading ? (
              <div
                className="flex flex-col justify-center items-center"
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
              <Button type="submit" variant="contained" endIcon={<Edit></Edit>}>
                تعديل{" "}
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
