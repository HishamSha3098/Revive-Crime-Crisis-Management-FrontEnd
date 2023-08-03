import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  RectangleGroupIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  PhotoIcon,
  UsersIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { Profile, DashHome } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import EventManagment from "./pages/dashboard/event";
import GalleryManagment from "./pages/dashboard/Gallery";
import Crisis from "./pages/dashboard/crisis";
import StaffApplication from "./pages/dashboard/Staff-application";
import ComplaintsView from "./pages/dashboard/Complaints";


const staff = localStorage.getItem("Staff_status") === "true"; // Assuming the localStorage value is a string "true" or "false"
console.log(staff,'this is  staff staus --------------');
const icon = {
  className: "w-5 h-5 text-inherit",
};

const basicRoutes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <DashHome />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "User List",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <RectangleGroupIcon {...icon} />,
        name: "Crisis Managment",
        path: "/Crisis",
        element: <Crisis />,
      },
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "Event Managment",
        path: "/event",
        element: <EventManagment />,
      },
      {
        icon: <PhotoIcon {...icon} />,
        name: "Gallery Managment",
        path: "/gallery",
        element: <GalleryManagment />,
      },
    ],
  },
];

const staffRoutes = [
  {
    title: "Staff Section",
    layout: "dashboard",
    pages: [
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Complaints Managment",
        path: "/complaint-view",
        element: <ComplaintsView />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Staff List",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
];

const routes = staff ?  staffRoutes :[...basicRoutes, ...staffRoutes] ;

export default routes;
