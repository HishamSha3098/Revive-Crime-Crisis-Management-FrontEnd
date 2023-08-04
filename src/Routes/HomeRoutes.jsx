
import { Home, SignIn, SignUp, UserProfile,  } from "@/Home/pages";
import CausesHome from "@/Home/pages/Causes";
import CausesView from "@/Home/pages/Causes View";
import EventView from "@/Home/pages/Event View";
import EventHome from "@/Home/pages/Events";
import PasswordReset from "@/Home/pages/PasswordReset";
import GalleryPost from "@/Home/pages/gallery";
import Profile from "@/Home/pages/profile";
import ComplexNavbar from "@/widgets/layout/navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";

import { ComplaintRegister } from "@/Home/pages/Complaint";
import Checkout from "@/Home/pages/Checkout";
import PaymentSuccess from "@/Home/pages/CheckoutSuccessful";
import PaymentFail from "@/Home/pages/paymentFailed";



function HomeRoutes() {

  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id')
  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/logout/')
      .then(response => {
        // Handle successful logout
        Cookies.remove("access_token")
        Cookies.remove("refresh_token")

        console.log('Logged out successfully!');
        localStorage.removeItem('user_id')
        toast.success("LogOut Successfull")
        navigate("/login")

        // Perform any other necessary actions, such as updating the UI or redirecting the user
      })
      .catch(error => {
        // Handle error
        console.error('Logout failed:', error);
      });
    }
    return (
      <>
      <div className="flex items-center justify-end py-1 px-5 bg-black">
  <a size="sm" href="/profile" className="flex items-center text-gray-500 ml-2">
    <img src="https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png" alt="User Profile Logo" className="h-4 w-4 mr-2" />
    Profile
  </a>
  {user_id?(<button onClick={handleLogout} className="text-gray-500 ml-2">Sign Out</button>):(<Link to="/login" className="text-gray-500 ml-2">Sign In</Link>)}
</div>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
    
    <ComplexNavbar />
       
      </div>

      <Routes>
        
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/reset-pass/:userId" element={<PasswordReset/>}/>

        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/CausesHome" element={<CausesHome/>}/>
        <Route path="/Causes-view" element={<CausesView/>}/>
        <Route path="/event-Home" element={<EventHome/>}/>
        <Route path="/Event-view" element={<EventView/>}/>
        <Route path="/Gallery-posts" element={<GalleryPost/>}/>
        <Route path="/complaint" element={<ComplaintRegister />} />
        <Route path="/Checkout" element={<Checkout />} />
        


        
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home/>}/>
  
       
      </Routes>
      </>
    );
  }
  
  export default HomeRoutes;