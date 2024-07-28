import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import {
  Avatar,
  Badge,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  Slide,
  Button,
} from "@mui/material";
import {
  IoMenuOutline,
  IoNotificationsOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "usehooks-ts";
import { BsChevronCompactRight, BsMenuApp } from "react-icons/bs";
import AddآNewTask from "../../../../features/tasks/AddNewTask";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BrandItem } from "@/api/Brand/dto";
import { useState } from "react";
import { CategoryItem } from "@/api/Category/dto";
import { WarehouseItem } from "@/api/Warehouse/dto";
import { GetAllCar } from "@/api/Car/dto";
import { Link } from "react-router-dom";
import { LoginOutlined, Logout } from "@mui/icons-material";
import { axiosIns } from "@/app/config/axios/axios";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Props {
  drawerWidth: number;
  drawerOpen: boolean;
  onMobileDrawerOpen: (e: any) => void;
  onOpen: (e: any) => void;
}
export default function Navbar({
  drawerWidth,
  onOpen,
  drawerOpen,
  onMobileDrawerOpen,
}: Props) {
  const { toggle, isDarkMode } = useDarkMode(false);

  const brands = useSelector<RootState, BrandItem[]>((s) => s.brand.brands);
  const [categoriesList, setcategoriesList] = useState<CategoryItem[]>([]);
  const [carsList, setCarsList] = useState<GetAllCar[]>([]);
  const [warehouseList, setWarehouseList] = useState<WarehouseItem[]>([]);

 
  interface Props {
 
    window?: () => Window;
    children: React.ReactElement;
  }

  function HideOnScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      threshold: 50,
    });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open: drawerOpen }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(drawerOpen && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  // const logOut = () => {
  //   axiosIns.post("/auth/logout", null).then(() => {
  //     localStorage.clear();
  //     console.log(localStorage);
  //     // window.location.href = "/login";
  //   });
  // };
  const logOut = () => {
    axiosIns.post("/auth/logout", null).then((res) => {
      localStorage.clear();
      console.log("LocalStorage after clear:", localStorage); // This will show an empty localStorage
      window.location.reload();
      window.location.href = "/login";
    });
  };

  // const logOut = () => {
  //   axiosIns
  //     .post("/auth/logout", null)
  //     .then(() => {
  //       // window.location.href = "/login";
  //       // Redirect to the login page
  //       localStorage.clear(); // Clear all localStorage items
  //       console.log("LocalStorage after clear:", localStorage); // This will show an empty localStorage
  //     })
  //     .catch((error) => {
  //       console.error("Error during logout:", error);
  //     });
  // };

  return (
    <HideOnScroll>
      <AppBar position="sticky" color="transparent" sx={{ p: 2 }}>
        <Paper sx={() => ({ p: 3, transition: "0.4s" })} elevation={0}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Box
              className="left"
              display={"flex"}
              gap={2}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {!drawerOpen && (
                <IconButton
                  size="small"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onOpen}
                  edge="start"
                  sx={{
                    height: 35,
                    width: 35,
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  <BsChevronCompactRight />
                </IconButton>
              )}

              <IconButton
                onClick={onMobileDrawerOpen}
                size="large"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{
                  display: {
                    md: "none",
                  },
                }}
              >
                <IoMenuOutline />
              </IconButton>
            </Box>
            <Box className="right relative">
              <Box
                sx={{ flexGrow: 0, alignItems: "center" }}
                display={"flex"}
                gap={{
                  md: 3,
                  xs: 1,
                }}
              >
                {" "}
                <AddآNewTask
                  brands={brands}
                  inventories={warehouseList}
                  categories={categoriesList}
                  cars={carsList}
                ></AddآNewTask>
                {/* <Link to="" style={{ textDecoration: "none" }}> */}
                {/* <div className="item logout">
                    <Logout className="icon" onClick={logOut} />
                  </div> */}
                <button onClick={logOut}>
                  <Logout className="icon" />
                </button>
                {/* </Link> */}
                <IconButton onClick={() => toggle()}>
                  {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Paper>
      </AppBar>
    </HideOnScroll>
  );
}
