import { WarehouseApi } from "@/api/Warehouse";
import { AddWarehouseDto, WarehouseItem } from "@/api/Warehouse/dto";
import { axiosIns } from "@/app/config/axios/axios";
import {
  Add,
  Close,
  Edit,
  PauseCircleOutline,
  PlayCircleOutline,
  VideoCameraBack,
  Watch,
  WatchLater,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsEyeFill } from "react-icons/bs";
import { HiEye } from "react-icons/hi2";
import { toast } from "react-toastify";
import Pusher from "pusher-js";

interface Camera {
  id: number;
  name: string;
  ip: number;
  corridor: Corridor;
}
interface Corridor {
  created_at: string;
  id: number;
  label: string;
}
interface ApiResponse {
  data: Camera;
  links: Record<string, any>;
  meta: Record<string, any>;
}
interface PropsType {
  id: number;
}
interface AiDetectionEvent {
  time: number; // The time in seconds to display the event
  className: string; // The AI detection class name
}

const pusherAppKey = "32f7bb277f8766b86351"; // Replace with your Pusher app key
const pusherCluster = "ad7ccb6859bc3cdea81b"; // Replace with your Pusher cluster

export default function WatchCamera({ id }: PropsType) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [aiDetections, setAiDetections] = useState<AiDetectionEvent[]>([]);

  const [v1, setV1] = useState<number>(10);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handelRequest = () => {
    axiosIns
      .post(`/dashboard/camera/start/${id}`)
      .then((res) => {
        setItems(res.data);
        console.log("API Response:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  };
  useEffect(() => {
    // Initialize Pusher
    Pusher.logToConsole = true;
    const pusher = new Pusher(pusherAppKey, {
      cluster: "eu",
    });
    // Subscribe to the channel and bind the event
    const channel = pusher.subscribe(
      "notifications.product_catches_from_a_shelf"
    );
    channel.bind("my-event", (data: AiDetectionEvent) => {
      setAiDetections((prevDetections) => [...prevDetections, data]);
      videoRef.current?.play();
      setV1((prevV1) => prevV1 - 1);
      setAiDetections((prevDetections) => [...prevDetections, data]);
      console.log("Received event:", data);
    });

    // Cleanup function
    return () => {
      pusher.unsubscribe("notifications.product_catches_from_a_shelf");
    };
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
          handelRequest();
        }}
        onSubmit={handelRequest}
        variant="contained"
      >
        <VideoCameraBack className=" text-2xl" />
      </Button>
      <Dialog maxWidth="sm" disableScrollLock fullWidth open={open}>
        <form>
          <Box
            display={"flex"}
            paddingTop={2}
            paddingRight={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <DialogTitle></DialogTitle>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <DialogContent className="flex flex-row justify-center gap-16 items-start mb-8 ">
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
              <Card sx={{ mt: 4, minWidth: 750 }}>
                <Box className="flex flex-col justify-center  items-start">
                  <video
                    ref={videoRef}
                    src="aaa.mp4"
                    width={250}
                    height={250}
                    // onTimeUpdate={handleTimeUpdate}
                    muted
                    className="border rounded-2xl border-none"
                  ></video>
                </Box>
                <Box
                  gap={5}
                  className="flex flex-col justify-center items-center mt-8"
                >
                  <Typography
                    className="flex flex-col justify-center text-[#90CAF9]"
                    variant="h2"
                    fontSize={24}
                    fontWeight={"bold"}
                  >
                    <span>كاميرا رقم {id} </span>{" "}
                  </Typography>
                  <List className="flex flex-col justify-between items-center">
                    <ListItem>
                      <Typography
                        className="flex flex-col justify-between items-center gap-6"
                        fontSize={18}
                      >
                        <span> عدد المنتجات الاول : {v1} </span>
                        <span> عدد المنتجات الثاني : {v1} </span>
                      </Typography>
                    </ListItem>
                  </List>
                </Box>
              </Card>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
{
  /* <DialogActions>
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
          </DialogActions> */
}

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

//     var pusher = new Pusher("32f7bb277f8766b86351", {
//       cluster: "eu",
//     });
//     // Assuming you know the notification type beforehand or can dynamically determine it
//     var channelName = "notifications.product_catches_from_a_shelf"; // Example channel name
//     var eventName = "my-event"; // Event name is typically the class name
// var data = "hiiii"
//     var channel = pusher.subscribe(channelName);
//     channel.bind(eventName, function () {
//       alert(JSON.stringify("iiiiii"));
//     });
