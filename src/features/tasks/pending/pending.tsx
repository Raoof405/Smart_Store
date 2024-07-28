import { axiosIns } from "@/app/config/axios/axios";
import { Add, PlusOne, Refresh, RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import DeleteTaskPending from "./components/DeleteTaskPending";
import EditeTaskPending from "./components/EditeTaskPending";
import NoData from "@/shared/components/NoData";
import PartsSkeleton from "@/shared/components/TableSkeleton";

interface User {
  created_at: string;
  email: string;
  id: number;
  name: string;
}
interface Task {
  body: string;
  created_at: string;
  id: number;
  priority: number;
  status: string;
  title: string;
  user: User;
}

// Define the type for the API response
interface ApiResponse {
  data: Task[];
  links: Record<string, any>;
  meta: Record<string, any>;
}

export default function Pending() {
  // ============================================================================================

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const response = await axiosIns.get<ApiResponse>(
        `/dashboard/task/index`,
        {
          params: {
            filters: {
              status: "todo", 
            },
          },
        }
      );

      setTasks(response.data.data);
      // console.log(response.data);
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
      {loading ? (
        <PartsSkeleton></PartsSkeleton>
      ) : tasks.length ? (
        <div>
          <Card sx={{ mt: 2, minWidth: 750 }}>
            <div className="Table">
              <Table
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
              >
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">المهمة </TableCell>
                      <TableCell align="center">المهمة</TableCell>
                      <TableCell align="center">تفاصيل المهمة</TableCell>

                      <TableCell align="center">اسم العامل</TableCell>
                      <TableCell align="center">تاريخ الانشاء</TableCell>
                      <TableCell align="center">الاجرائيات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ color: "white" }}>
                    {tasks.map((task) => (
                      <TableRow
                        key={task.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{task.id}</TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {task.title}
                        </TableCell>
                        <TableCell align="center">{task.body}</TableCell>
                        <TableCell align="center">{task.user.name}</TableCell>

                        <TableCell align="center">
                          {/* {task.created_at} */}
                          {new Date(task.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell align="center">
                          <EditeTaskPending id={task.id} />
                          <DeleteTaskPending id={task.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Table>
            </div>
          </Card>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
