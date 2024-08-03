// import PartsTable from "./components/PartsTable";
// import PartsFilter from "./components/PartsFilter";

import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";

import { Refresh, Search } from "@mui/icons-material";

import { APP_CURRENCY } from "@/app/config/app.config";
import AddProduct from "./components/AddProduct";
import { axiosIns } from "@/app/config/axios/axios";
import { toast } from "react-toastify";
import EditeProduct from "./components/EditeProduct";
import DeleteProduct from "./components/DeleteProduct";
import PartsSkeleton from "@/shared/components/TableSkeleton";
import NoData from "@/shared/components/NoData";
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
function Products() {
  // ============================================================================================
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const response = await axiosIns.get<ApiResponse>(
        `/dashboard/product/index`,
        {
          params: {
            paginate: 30,
          },
        }
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
      <Card className="mb-4">
        <div className="flex flex-col p-4 gap-4 ">
          <div className="flex flex-row justify-between items-center gap-10">
            <Typography variant="h2" fontWeight={"bold"} fontSize={24}>
              المنتجات
            </Typography>
            <TextField
              className="w-[30%]"
              label="ابحث عن المنتج..."
              variant="standard"
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" aria-label="search">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className="flex gap-4">
              <Button onClick={() => {}} endIcon={<Refresh />}>
                تهيئة
              </Button>
              <AddProduct />
            </div>
          </div>
        </div>
      </Card>

      {loading ? (
        <PartsSkeleton></PartsSkeleton>
      ) : items.length ? (
        <div>
          <TableContainer>
            <Paper>
              <Table
                sx={{ minWidth: 450, overflowY: "auto" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">رقم المنتج</TableCell>
                    <TableCell align="center">المنتج</TableCell>
                    <TableCell align="center">اسم الشركة المصنعة</TableCell>
                    <TableCell align="center">اسم الرف</TableCell>
                    <TableCell align="center">السعر</TableCell>
                    <TableCell align="center">الكمية الاجمالية</TableCell>
                    <TableCell align="center">الكمية المتوفرة</TableCell>
                    <TableCell align="center">الاجرائيات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items
                    .filter((item) => item.name.toLowerCase().includes(search))
                    .map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <div className="flex flex-col items-center ">
                            <span className="">{item.id}</span>
                          </div>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <div className="flex flex-col items-center gap-2">
                            <span>{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <span className="text-base">
                            {item.category.name ?? "N/A"}
                            {/* {item.category} */}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span className="text-base">
                            {item.sector.name ?? "N/A"}
                            {/* {item.sector} */}
                          </span>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ color: 100 >= 0 ? "#689F39" : "red" }}
                        >
                          <span className="text-lg  ">{item.price}</span>{" "}
                          {APP_CURRENCY}
                        </TableCell>{" "}
                        <TableCell align="center">
                          {" "}
                          <span className="text-base">{item.stock}</span>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: item.min_stock > 5 ? "#689F39" : "red",
                          }}
                        >
                          <span className="text-base">{item.min_stock}</span>
                        </TableCell>
                        <TableCell align="center">
                          <div className=" flex flex-row justify-center items-center gap-5">
                            <EditeProduct id={item.id} />
                            <DeleteProduct id={item.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default Products;
