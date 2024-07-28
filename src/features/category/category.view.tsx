// import PartsTable from "./components/PartsTable";
// import PartsFilter from "./components/PartsFilter";

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
import AddCategory from "./components/AddCategory";
import EditeCategory from "./components/EditeCategory";
import DeleteCategory from "./components/DeleteCategory";
import { axiosIns } from "@/app/config/axios/axios";
import { toast } from "react-toastify";
import PartsSkeleton from "@/shared/components/TableSkeleton";
import NoData from "@/shared/components/NoData";

// Define the type for individual items
interface category {
  id: number;
  name: string;
}

// Define the type for the API response
interface ApiResponse {
  data: category[];
  links: Record<string, any>;
  meta: Record<string, any>;
}

function Category() {
  const [loading, setLoading] = useState<boolean>(true); //true
  const [items, setItems] = useState<category[]>([]);
  const fetchData = async () => {
    await axiosIns
      .get<ApiResponse>(`/dashboard/category/index`)
      .then((response) => {
        setItems(response.data.data);
        setLoading(false);
        //  console.log(items[0].name);
        // console.log(res.data);
        // console.log(formData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Card className="mb-4">
        <div className="flex flex-col p-4 gap-4 ">
          <div className="flex justify-between">
            <Typography variant="h2" fontWeight={"bold"} fontSize={24}>
              الشركات المصنعة
            </Typography>
            <div className="flex gap-4">
              <Button onClick={() => {}} endIcon={<Refresh />}>
                تهيئة
              </Button>
              <AddCategory />
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
              <Table sx={{ maxWidth: 950 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">رقم الشركة</TableCell>
                    <TableCell align="center">الشركة المنتجة</TableCell>
                    <TableCell align="center">الاجرائيات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div className="flex flex-col items-center ">
                          <span className="">{item.id}</span>
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div className="flex flex-col items-center gap-2">
                          {/* <img
                            // alt={row.name}
                            height={55}
                            width={55}
                            className="transition duration-150 hover:scale-150"
                            // src={`${SERVER_URL}/${row.image}`}
                            src="src/assets/images/download.jfif"
                          /> */}
                          <span>{item.name}</span>
                        </div>
                      </TableCell>

                      <TableCell align="center">
                        <EditeCategory id={item.id} />
                        <DeleteCategory id={item.id} />
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

export default Category;
