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
import Camera from "../settings/camera/camera.view";
import Pathes from "../settings/pathes/pathes.view";
import Sector from "../settings/sector/sector.view";
import Pending from "../tasks/pending/pending";
import InProgress from "../tasks/inprogress/inprogress";
import Success from "../tasks/success/success";
function createData(
  name: string,
  trackingId: number,
  date: string,
  status: string
) {
  return { name, trackingId, date, status };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const rows = [
    createData("Lasania Chiken Fri", 18908424, "2 March 2022", "In Progrees"),
    createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
    createData("Mouth Freshner", 18908424, "2 March 2022", "In Progrees"),
    createData("Cupcake", 18908421, "2 March 2022", "Finish"),
  ];
  const rows2 = [
    createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Finish"),
    createData("Big Baza Bang ", 18908424, "2 March 2022", "Finish"),
    createData("Mouth Freshner", 18908424, "2 March 2022", "Finish"),
    createData("Cupcake", 18908421, "2 March 2022", "Finish"),
  ];
  const makeStyle = (status: string) => {
    if (status === "In Progrees") {
      return {
        background: "#387ADF",
        color: "#fff",
      };
    } else if (status === "Pending") {
      return {
        background: "#FF004D",
        color: "#fff",
      };
    } else {
      return {
        background: "#9BCF53",
        color: "#fff",
      };
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card className="p-4">
        <Typography variant="h2" fontSize={24} fontWeight={"bold"}>
          المهام
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="المعلقة" {...a11yProps(0)} />
            <Tab label="قيد التنفيذ" {...a11yProps(1)} />
            <Tab label="المنتهية" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </Card>

      <TabPanel value={value} index={0}>
        <Pending />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <InProgress />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Success />
      </TabPanel>
    </Box>
  );
}
