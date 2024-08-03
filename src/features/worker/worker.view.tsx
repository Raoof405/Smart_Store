import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useQuery, useQueryClient } from "react-query";
import { ClientApi } from "@/api/Client";
import {
  Card,
  IconButton,
  Paper,
  TableBody,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Add, Delete, Edit, QrCode, Search } from "@mui/icons-material";
import AddWorker from "@/features/worker/components/AddWorker";
import { ClientItem } from "@/api/Client/GetAll";
import EditeWorker from "./components/EditeWorker";
import DeleteWorker from "./components/DeleteWorker";
import QrWorker from "./components/QrWorker";
import QRCode from "qrcode";
import { axiosIns } from "@/app/config/axios/axios";
import NoData from "@/shared/components/NoData";
import PartsSkeleton from "@/shared/components/TableSkeleton";
interface Worker {
  created_at: string;
  email: string;
  id: number;
  name: string;
  user_type: string;
}

function Worker() {
  const [clientToModify, setClientToModify] = useState<ClientItem | null>(null);
  const [showClientModal, setClientModal] = useState(false);

  const [qr, setQr] = useState("");
  // const GenerateQRCode = (id: string) => {
  //   QRCode.toDataURL(
  //     "rrr",
  //     {
  //       width: 800,
  //       margin: 2,
  //       color: {
  //         dark: "#335383FF",
  //         light: "#EEEEEEFF",
  //       },
  //     },
  //     (err, id) => {
  //       if (err) return console.error(err);

  //       console.log(id);
  //       setQr(id);
  //     }
  //   );
  // };
  const [search, setSearch] = useState("");

  const [worker, setWorker] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const response = await axiosIns.get(`/dashboard/user/index`, {
        params: {
          paginate: 20,
        },
      });
      setWorker(response.data.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);

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
      <AddWorker
        isOpen={showClientModal}
        onSetOpen={(nv) => {
          if (!nv) {
            setClientToModify(null);
          }
          setClientModal(nv);
        }}
      />
      <TableContainer>
        <Card
          // sx={{ p: 2, mb: 2 }}
          sx={{
            p: 2,
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontSize={24} fontWeight={"bold"}>
            العمال
          </Typography>
          <TextField
            className="w-[30%]"
            label="ابحث عن العامل..."
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
          <Button variant="contained" onClick={() => setClientModal(true)}>
            إضافة عامل
            <Add />
          </Button>
        </Card>

        {loading ? (
          <PartsSkeleton></PartsSkeleton>
        ) : worker.length ? (
          <Card sx={{ mt: 2, minWidth: 750 }}>
            <div className="Table">
              <Table
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
              >
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">رقم العامل</TableCell>
                      <TableCell align="center">اسم العامل</TableCell>
                      <TableCell align="center">البريد الالكتروني</TableCell>
                      <TableCell align="center">نوع العامل</TableCell>
                      <TableCell align="center">الإجرائيات</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {worker
                      .filter((item) =>
                        item.name.toLowerCase().includes(search)
                      )
                      .map((wk) => (
                        <TableRow
                          key={wk.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center" component="th" scope="row">
                            <div className="">
                              {/* {row.isSeller ? <FaStore /> : <FaUser />} */}
                              <span className="">{wk.id}</span>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="flex flex-col items-center  gap-4">
                              {/* <img
                        // alt={row.name}
                        height={55}
                        width={55}
                        className="transition duration-150 hover:scale-150 rounded-full"
                        // src={`${SERVER_URL}/${row.image}`}
                        src="src/assets/images/download.jfif"
                      /> */}
                              <span className="">{wk.name}</span>
                            </div>
                          </TableCell>
                          <TableCell align="center">{wk.email}</TableCell>
                          <TableCell align="center">{wk.user_type}</TableCell>
                          <TableCell align="center">
                            <div className=" flex flex-row justify-center items-center gap-2">
                              <QrWorker
                                id={wk.id.toString()}
                                // onClick={() => GenerateQRCode(wk.id.toString())}
                              ></QrWorker>
                              <EditeWorker id={wk.id}></EditeWorker>

                              <DeleteWorker id={wk.id}></DeleteWorker>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Table>
            </div>
          </Card>
        ) : (
          <NoData />
        )}
      </TableContainer>
    </div>
  );
}

export default Worker;
