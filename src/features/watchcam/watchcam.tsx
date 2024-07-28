import {
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";

import { Refresh } from "@mui/icons-material";

import { APP_CURRENCY } from "@/app/config/app.config";
// import AddProduct from "./components/AddProduct";
import { axiosIns } from "@/app/config/axios/axios";
import { toast } from "react-toastify";
// import EditeProduct from "./components/EditeProduct";
// import DeleteProduct from "./components/DeleteProduct";
import PartsSkeleton from "@/shared/components/TableSkeleton";
import NoData from "@/shared/components/NoData";
import AddProduct from "../products/components/AddProduct";
import EditeProduct from "../products/components/EditeProduct";
import DeleteProduct from "../products/components/DeleteProduct";
import VideoPlayer from "./cardVideo";
import VideoCard from "./cardVideo";
// Define the type for individual items
interface Item {
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
  corridor: any; // Define a proper type based on your data
  camera: any; // Define a proper type based on your data
  created_at: string;
}

interface Category {
  created_at: string;
  id: number;
  name: string;
}

// Define the type for the API response
interface ApiResponse {
  data: Item[];
  links: Record<string, any>;
  meta: Record<string, any>;
}
function Watchcam() {
  // ============================================================================================

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const response = await axiosIns.get<ApiResponse>(
        `/dashboard/product/index`
      );
      setItems(response.data.data);
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

  return (
    <div>
      {/* <Card className="mb-4">
        <div className="flex flex-col p-4 gap-4 ">
          <div className="flex justify-between">
            <Typography variant="h2" fontWeight={"bold"} fontSize={24}>
              الفيديوهات
            </Typography>
            <div className="flex gap-4">
              <Button onClick={() => {}} endIcon={<Refresh />}>
                تهيئة
              </Button>
              <AddProduct />
            </div>
          </div>
        </div>
      </Card> */}

      {loading ? (
        <PartsSkeleton></PartsSkeleton>
      ) : items.length ? (
        <div>
          <TableContainer>
            <Paper>
             
              <VideoCard />
           
            </Paper>
          </TableContainer>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default Watchcam;
