import { WarehouseApi } from "@/api/Warehouse";
import { WarehouseItem } from "@/api/Warehouse/dto";
import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import AddCamera from "./components/AddCamera";
import UpdateCamera from "./components/EditeCamera";
import DeleteCamera from "./components/DeleteCamera";
import { axiosIns } from "@/app/config/axios/axios";
import PartsSkeleton from "@/shared/components/TableSkeleton";
import NoData from "@/shared/components/NoData";
import WatchCamera from "./components/WatchCamera";
interface cam {
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
// Define the type for the API response
interface ApiResponse {
  data: cam[];
  links: Record<string, any>;
  meta: Record<string, any>;
}
export default function Camera() {
  const [cameras, setCameras] = useState<cam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      // `/dashboard/camera/index?filter[statuse = todo]`;

      const response = await axiosIns.get<ApiResponse>(
        `/dashboard/camera/index`
      );
      setCameras(response.data.data); // Access the data array from the response
      // console.log(response.data.data);
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
    fetchData();
    // const intervalId = setInterval(fetchData, 3000);
    // return () => clearInterval(intervalId);
  }, []);

  //stage
  const [dialogOpen, setdialogOpen] = useState(false);
  const [modifyDto] = useState<WarehouseItem | null>(null);

  return (
    <div>
      <Card
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2" fontSize={24} fontWeight={"bold"}>
          الكاميرات
        </Typography>

        <Button
          variant="contained"
          onClick={() => setdialogOpen(true)}
          endIcon={<Add />}
        >
          إضافة كاميرا
        </Button>
        <AddCamera
          dialogProps={{
            open: dialogOpen,
            onClose: () => {
              setdialogOpen(false);
            },
          }}
        ></AddCamera>
      </Card>
      {loading ? (
        <PartsSkeleton></PartsSkeleton>
      ) : cameras.length ? (
        <Card sx={{ mt: 4, minWidth: 750 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  رقم الكاميرا
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  اسم الكاميرا
                </TableCell>

                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  اسم الممر
                </TableCell>
                {/* <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  رقم ip الخاص بالكاميرا
                </TableCell> */}

                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  الاجرائيات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cameras.map((camera) => (
                <TableRow key={camera.id}>
                  <TableCell align="center">{camera.id}</TableCell>
                  <TableCell align="center">{camera.name}</TableCell>
                  <TableCell align="center">{camera.corridor.label}</TableCell>
                  {/* <TableCell align="center">{camera.ip}</TableCell> */}
                  <TableCell align="center">
                    <WatchCamera id={camera.id} />
                    <UpdateCamera id={camera.id} />
                    <DeleteCamera id={camera.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <NoData />
      )}
    </div>
  );
}
