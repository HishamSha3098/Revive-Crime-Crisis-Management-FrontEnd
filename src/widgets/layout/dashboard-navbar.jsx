import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { API_URL } from "@/Config/config";
import { useState } from "react";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  // const user_id = localStorage.getItem('user_id')
  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/logout/')
      .then(response => {
        // Handle successful logout
        Cookies.remove("access_token")
        Cookies.remove("refresh_token")

        console.log('Logged out successfully!');
        localStorage.removeItem('user_id')
        localStorage.removeItem('Staff_status')
        toast.success("LogOut Successfull")
        navigate("/admin")

        // Perform any other necessary actions, such as updating the UI or redirecting the user
      })
      .catch(error => {
        // Handle error
        console.error('Logout failed:', error);
      });
    }


// Connect to the WebSocket
console.log("Before creating WebSocket connection");



const socket = new WebSocket("ws://localhost:8000/ws/notifications/");
console.log("After creating WebSocket connection");
// Listen for messages
socket.onmessage = (event) => {
  const notification = JSON.parse(event.data);
  setNotifications((prevNotifications) => [notification, ...prevNotifications]);
};

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Type here" />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          
            <Button
              onClick={handleLogout}
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              LogOut
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
  {notifications.map((notification, index) => (
    <MenuItem key={index} className="flex items-center gap-3">
      <Avatar
        src={notification.avatarSrc}
        alt={`item-${index}`}
        size="sm"
        variant="circular"
      />
      <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 font-normal"
        >
          <strong>{notification.title}</strong> {notification.message}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="flex items-center gap-1 text-xs font-normal opacity-60"
        >
          <ClockIcon className="h-3.5 w-3.5" /> {notification.timestamp}
        </Typography>
      </div>
    </MenuItem>
  ))}
</MenuList>

          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
