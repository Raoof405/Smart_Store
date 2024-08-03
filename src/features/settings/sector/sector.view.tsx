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
import AddSector from "./components/AddSector";
import UpdateSector from "./components/EditeSector";
import DeleteSector from "./components/DeleteSector";
import { axiosIns } from "@/app/config/axios/axios";
import PartsSkeleton from "@/shared/components/TableSkeleton";
import NoData from "@/shared/components/NoData";
import ImageWithRectangle from "./components/draw";
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
// Define the type for the API response
interface ApiResponse {
  data: Sectors[];
  links: Record<string, any>;
  meta: Record<string, any>;
}
export default function Sector() {
  const [sectors, setSectors] = useState<Sectors[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const response = await axiosIns.get<ApiResponse>(
        `/dashboard/sector/index`, {
        params: {
          paginate: 20,
        },
      }
      );
      setSectors(response.data.data); // Access the data array from the response
      console.log(response.data);
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
          الرفوف
        </Typography>

        <Button
          variant="contained"
          onClick={() => setdialogOpen(true)}
          endIcon={<Add />}
        >
          إضافة رف
        </Button>
        <AddSector
          dialogProps={{
            open: dialogOpen,
            onClose: () => {
              setdialogOpen(false);
            },
          }}
        ></AddSector>
      </Card>
      {loading ? (
        <PartsSkeleton></PartsSkeleton>
      ) : sectors.length ? (
        <Card sx={{ mt: 4, minWidth: 750 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  رقم الرف
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  اسم الرف
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  اسم الممر{" "}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  اسم الكاميرا{" "}
                </TableCell>

                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  إجرائات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sectors.map((sector) => (
                <TableRow key={sector.id}>
                  <TableCell align="center">{sector.id}</TableCell>
                  <TableCell align="center">{sector.name}</TableCell>

                  <TableCell align="center">{sector.corridor.label}</TableCell>
                  <TableCell align="center">{sector.camera.name}</TableCell>
                  <TableCell align="center">
                    <div className=" flex flex-row justify-center items-center gap-5">
                      <UpdateSector id={sector.id} />
                      <DeleteSector id={sector.id} />
                    </div>{" "}
                    {/* <ImageWithRectangle  /> */}
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
