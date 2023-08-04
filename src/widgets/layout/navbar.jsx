import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


export default function ComplexNavbar() {
  const [openNav, setOpenNav] = useState(false);
  
  const [isMobileView, setIsMobileView] = useState(false);
 

  const navigate = useNavigate();
  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 960);
    if (window.innerWidth >= 960) {
      setOpenNav(false);
    }
  };
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          About
        </a>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <Link to="/CausesHome" className="flex items-center">
          Causes             
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <Link to="/event-Home" className="flex items-center">
          Events
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <Link to="/complaint" className="flex items-center">
          Complaints
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <Link to="/Gallery-posts" className="flex items-center">
          Gallery
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <Link to="/volunteer" className="flex items-center">
          Volunteer
        </Link>
      </Typography>
    </ul>
  );
 
  const handleDonate = (crisis) => {
    // Pass crisis.id as state while navigating
    navigate('/Checkout');
  };



  return (
    <Navbar
      className={`mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 ${
        isMobileView ? "bg-gray-800" : "bg-transparent"
      }`}
      color={isMobileView ? "white" : "transparent"}
    >
      
      <div className="container mx-auto flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          <img src="\img\reviviel ogo white.png" alt="Logo" className="h-10" />
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button  size="sm" onClick={() => handleDonate()} className="hidden bg-green-500 lg:inline-block">
          <span>Donate Now</span>
        </Button>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button size="sm" onClick={() => handleDonate()} fullWidth className="mb-2 bg-green-500">
            <span>Donate Now</span>
          </Button>
          
        </div>
      </MobileNav>
    </Navbar>
  );
}
