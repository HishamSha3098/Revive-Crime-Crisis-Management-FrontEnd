import { Avatar, Typography, Button ,Input,Card, Select, Option,CardHeader,CardBody, } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import {PageTitle, Footer } from "@/Home/widgets/layout";
import React, { useEffect, useRef, useState } from "react";
import ComplexNavbar from "@/widgets/layout/navbar";


import LoadingSpinner from "@/utils/loadingSpinner";
import { useNavigate } from "react-router-dom";

import axios from "axios";






export function CausesHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [progressvalue , setProgressValue] = useState({})
  const [Crisis, setCrisis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrisis();
  }, []);

  const fetchCrisis = async () =>{
    const response =await axios.get('http://127.0.0.1:8000/crisis_list/')
    setCrisis(response.data)

   
  }


  

  return (
    
    <>

      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('http://localhost:5173/public/img/banner-crisis.jpg')] bg-cover bg-center" />

        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />

      </section>
      {isLoading && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-50"
          aria-hidden="true"
        >
          <LoadingSpinner/>
        </div>
      )}

<br/>

<div className="container mx-auto">
          <PageTitle heading="Extending a Helping Hand">
          Together, we can be a beacon of hope amidst the storms of crisis. Your donation can make a difference in the lives of these facing adversity.
          </PageTitle>
         
        </div>
        <br/>
        <br/>
        <br/>


<div className=" flex justify-center">

<div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-4">

{Crisis.length > 0 ?(
Crisis.map((crisis,index)=>(
<Card key={index} className="shadow-lg mt-6 shadow-gray-500/10">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src={`http://127.0.0.1:8000/${crisis.img}`}
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold text-sm"
                  >
                    {crisis.title}
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    {crisis.description}
                  </Typography>
                  <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-blue-700 text-xs dark:text-black">Received:{crisis.recived_amount}</span>
                  <span className="text-sm font-medium text-blue-700 text-xs dark:text-black">Goal:{crisis.donation_goal}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.round((crisis.recived_amount/crisis.donation_goal)*100)}%` }}></div>
                <span className="text-sm text-black text-xs absolute top-0 left-0 w-full h-full flex items-center justify-center">
                {Math.round((crisis.recived_amount/crisis.donation_goal)*100)}%
                </span>
              </div>

                <br/>
                <div className="flex gap-4">
                <div>
                  <Button className="w-full">ReadMore</Button>
                  </div>
                  <div>
                  <Button className="w-full bg-green-500">Donate</Button>
                  </div>
                  </div>
                </CardBody>
              </Card>
                ))
             ):(
              <p>No crisis data available.</p>
             )}

              
              </div>
              </div>
      
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default CausesHome;
