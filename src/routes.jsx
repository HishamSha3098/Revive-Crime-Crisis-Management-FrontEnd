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
import { Profile, DashHome, Crisis } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import EventManagment from "./pages/dashboard/event";
import GalleryManagment from "./pages/dashboard/Gallery";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
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
        path: "/notifactions",
        element: <GalleryManagment />,
      },
    ],
  },
  {
    title: "Staff Section",
    layout: "dashboard",
    pages: [
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Complaints Managment",
        path: "/tables",
        element: <GalleryManagment />,
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

export default routes;
