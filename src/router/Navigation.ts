import { HiHome } from "react-icons/hi2";
import { IoSettings, IoTrendingUpSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import {
  CameraAltOutlined,
  Cottage,
  MarkChatRead,
  ProductionQuantityLimits,
  WarehouseOutlined,
} from "@mui/icons-material";
export default [
  {
    text: "الرئيسية",
    path: "/",
    icon: HiHome,
  },
  {
    text: "العمال",
    path: "/worker",
    icon: FaUsers,
  },
  {
    text: "المنتجات",
    path: "/products",
    icon: ProductionQuantityLimits,
    params: "?PageSize=5&PageNumber=1",
  },
  {
    text: "الشركات المصنًعة",
    path: "/Category",
    icon: WarehouseOutlined,
  },
  // {
  //   text: "مشاهدة الكاميرا",
  //   path: "/Watchcam",
  //   icon: CameraAltOutlined,
  // },
  {
    text: "الاعدادات",
    path: "/settings",
    icon: IoSettings,
  },
];
