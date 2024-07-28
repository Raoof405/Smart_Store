import { WarehouseApi } from "@/api/Warehouse";
import { WarehouseItem } from "@/api/Warehouse/dto";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ConfirmContext } from "@/shared/components/FeedBackProvider";
import { toast } from "react-toastify";
import AddPath from "./components/AddPath";
import EditePath from "./components/EditePath";
import DeletePath from "./components/DeletePath";
import { axiosIns } from "@/app/config/axios/axios";
import PartsSkeleton from "@/shared/components/TableSkeleton";
import NoData from "@/shared/components/NoData";
interface Pathes {
  id: number;
  label: string;
}

// Define the type for the API response
interface ApiResponse {
  data: Pathes[];
  links: Record<string, any>;
  meta: Record<string, any>;
}
export default function Pathes() {
  const [paths, setPaths] = useState<Pathes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const response = await axiosIns.get<ApiResponse>(
        `/dashboard/corridor/index`
      );
      setPaths(response.data.data); // Access the data array from the response
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
          الممرات
        </Typography>

        <Button
          variant="contained"
          onClick={() => setdialogOpen(true)}
          endIcon={<Add />}
        >
          إضافة ممر
        </Button>
        <AddPath
          dialogProps={{
            open: dialogOpen,
            onClose: () => {
              setdialogOpen(false);
            },
          }}
        ></AddPath>
      </Card>
      {loading ? (
        <PartsSkeleton></PartsSkeleton>
      ) : paths.length ? (
        <Card sx={{ mt: 4, maxWidth: 750 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>رقم الممر</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  اسم الممر
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  إجرائات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paths.map((path) => (
                <TableRow key={path.id}>
                  <TableCell>{path.id}</TableCell>
                  <TableCell align="left">{path.label}</TableCell>
                  {/* <TableCell>{wh.totalParts}</TableCell> */}
                  <TableCell align="center">
                    <EditePath id={path.id} />
                    <DeletePath id={path.id} />
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
