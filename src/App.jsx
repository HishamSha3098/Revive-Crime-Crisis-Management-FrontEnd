import { Routes, Route, Navigate} from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import HomeRoutes from "./Routes/HomeRoutes";
import { Toaster } from "react-hot-toast";
import A from "./Home/pages/a";
import AdminSignIn from "./pages/auth/adminSignin";
import { CrisisPreview } from "./pages/dashboard/crisisPreview";
// import HomeRoutes from "./HomeRoutes.jsx";
// import { Navbar } from "./widgets/layout";

function App() {
  return (
    <>
   

    <Routes>
      <Route path="/admin" element={<AdminSignIn />} />
      {/* <Route path="/a" element={<A/>}/> */}
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/*" element={<HomeRoutes/>}/>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/manage/preview" element={<CrisisPreview />} />
      {/* <Route path="*" element={<Navigate to="/homepage" replace />} /> */}
     

     
    </Routes>
   
    <Toaster />
    {/* <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes> */}
    </>
  );
}

export default App;