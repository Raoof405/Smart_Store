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
import Upload from "../../../../shared/components/Upload";
import ImageUpload from "../../../../shared/components/Upload";
import Editor from "./test";

interface Sectors {
  created_at: string;
  id: number;
  name: string | null;
  camera: Camera;
  corridor: Corridor;
  image?: File | null;
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
interface Props {
  dialogProps: DialogProps;
}
import {
  ShapeEditor,
  ImageLayer,
  DrawLayer,
  wrapShape,
} from "react-shape-editor";
import upload_icon from "../../../../assets/images/download.jfif";
import { UploadFile, UploadFileOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

interface ShapeItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Util Function for replacing items in an array
function arrayReplace<T>(arr: T[], index: number, item: T | T[]): T[] {
  return [
    ...arr.slice(0, index),
    ...(Array.isArray(item) ? item : [item]),
    ...arr.slice(index + 1),
  ];
}

// Rectangle Shape
const RectShape = wrapShape(
  ({ width, height }: { width: number; height: number }) => (
    <rect width={width} height={height} fill="rgba(0,0,255,0.5)" />
  )
);

let idIterator = 1;

export default function AddSector({ dialogProps }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  console.log(imageUrl);

  // /+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [selection1, setSelection1] = useState<Camera[]>([]);
  const [cameraId, setCameraId] = useState<number | string>("");
  // /+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [selection2, setSelection2] = useState<Corridor[]>([]);
  const [corridorId, setCorridorId] = useState<number | string>("");

  const [formData, setFormData] = useState<{
    name: string;
    corridor_id: number; // required
    camera_id: number; // required
    // image: File;
  }>({
    name: "",
    corridor_id: 0, // required
    camera_id: 0, // required
    // image: null,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handelsubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axiosIns
      .post(`/dashboard/sector/store`, {
        corridor_id: corridorId,
        camera_id: cameraId,
        name: formData.name,

        // item: items, //for send coordnaites
      })
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

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [items, setItems] = useState<ShapeItem[]>([
    // { id: "1", x: 20, y: 120, width: 145, height: 140 },
  ]);

  console.log(items);

  const [file, setFile] = useState<string | null>(null);

  const [{ vectorHeight, vectorWidth }, setVectorDimensions] = useState({
    vectorHeight: 0,
    vectorWidth: 0,
  });

  const uploadIconStyle: React.CSSProperties = {
    display: "inline",
    maxWidth: 500,
    maxHeight: 500,
  };

  // File change handler
  const fileChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      setFile(e.target?.result as string);
    };

    reader.readAsDataURL(selectedFile);
  };
  const [isIconVisible, setIsIconVisible] = useState(true);

  return (
    <Dialog maxWidth="md" fullWidth {...dialogProps}>
      <form onSubmit={handelsubmit}>
        <DialogTitle>إضافة الرف</DialogTitle>
        <DialogContent>
          <Box className="grid grid-cols-12" paddingY={2} gap={2}>
            <TextField
              required
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="col-span-12 md:col-span-4"
              id="outlined-basic1"
              label="اسم الممر"
              variant="outlined"
            />
            <FormControl className="col-span-12 md:col-span-4" fullWidth>
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
            </FormControl>
            <FormControl className="col-span-12 md:col-span-4" fullWidth>
              <InputLabel id="demo-simple-select-label">اسم الممر </InputLabel>
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
            {/* for upload image with detected X & Y & width and hight */}
            <div className="col-span-12 md:col-span-12">
              <div className="flex flex-row justify-center">
                <div>
                  {isIconVisible && (
                    <>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        sx={{ fontSize: "2rem" }}
                      >
                        <input
                          id="fileInput"
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={fileChangedHandler}
                        />
                        <UploadFileOutlined fontSize="inherit" />
                      </IconButton>
                    </>
                  )}
                </div>

                <div>
                  <ShapeEditor
                    style={uploadIconStyle}
                    vectorWidth={vectorWidth}
                    vectorHeight={vectorHeight}
                  >
                    <ImageLayer
                      src={file || upload_icon}
                      // alt={"Uploaded image"}

                      // style={uploadIconStyle}
                      // responsive
                      onLoad={({ naturalWidth, naturalHeight }) => {
                        setVectorDimensions({
                          vectorWidth: naturalWidth,
                          vectorHeight: naturalHeight,
                        });
                      }}
                    />
                    <DrawLayer
                      onAddShape={({ x, y, width, height }) => {
                        setItems((currentItems) => [
                          ...currentItems,
                          { id: `id${idIterator}`, x, y, width, height },
                        ]);
                        idIterator += 1;
                      }}
                    />
                    {items.map((item, index) => {
                      const { id, height, width, x, y } = item;
                      return (
                        <RectShape
                          key={id}
                          shapeId={id}
                          height={height}
                          width={width}
                          x={x}
                          y={y}
                          onChange={(newRect) => {
                            setItems((currentItems) =>
                              arrayReplace(currentItems, index, {
                                ...item,
                                ...newRect,
                              })
                            );
                            console.log(newRect);
                          }}
                          onDelete={() => {
                            setItems((currentItems) =>
                              arrayReplace(currentItems, index, [])
                            );
                          }}
                        />
                      );
                    })}
                  </ShapeEditor>
                </div>
              </div>
              {/* <Editor /> */}
              {/* <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUpload
                    {...field}
                    onChangeUrl={setImageUrl}
                    url={imageUrl}
                    label="صورة الرف"
                    name="image"
                  />
                )}
              /> */}
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => dialogProps.onClose?.(e, "backdropClick")}>
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
            <Button type="submit" variant="contained" endIcon={<Add></Add>}>
              {"إضافة"}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

//    <Controller
//      control={control}
//      name="name"
//      render={({ field }) => (
//        <FormControl className="col-span-12 md:col-span-6">
//          <InputLabel id="brandid">الممر الموجودة به الكاميرا</InputLabel>
//          <Select
//            {...field}
//            label=" الممر الموجودة به الكاميرا
// "
//            labelId="brandid"
//          >
//            {/* {props.brands.map((b) => (
//                         <MenuItem value={b.id} key={b.id}>
//                           {b.name}
//                         </MenuItem>
//                       ))} */}
//            <MenuItem>jjj</MenuItem>
//            <MenuItem>jjj</MenuItem>
//            <MenuItem>jjj</MenuItem>
//          </Select>
//        </FormControl>
//      )}
//    />;
