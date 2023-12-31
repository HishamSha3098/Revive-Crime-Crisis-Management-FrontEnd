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
import { API_URL } from "@/Config/config";






export function EventHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [progressvalue , setProgressValue] = useState({})
  const [Events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items to display per page
  const totalPages = Math.ceil(Events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = Events.slice(startIndex, endIndex);

  useEffect(() => {
    fetchCrisis();
  }, []);

  const fetchCrisis = async () =>{
    const response =await axios.get(`${API_URL}/event/`)
    setEvents(response.data)

   
  }

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const formattedDate = dateObj.toISOString().slice(0, 16).replace("T", " ");
    return formattedDate;
  }

  const handleReadMore = (events) => {
    // Passing events.id as state while navigating
    navigate('/Event-view', { state: { id: events.id } });
  };

  

  return (
    
    <>

      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/banner-events.jpg')] bg-cover bg-center" />

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
          <PageTitle heading="Check out">
          Our list of upcoming charity events below, and be a part of something meaningful.
          </PageTitle>
         
        </div>
        <br/>
        <br/>
        <br/>


<div className=" flex justify-center">

<div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-4">

{Events.length > 0 ?(
visibleData.map((events,index)=>(
<Card key={index} className="shadow-lg mt-6 shadow-gray-500/10">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src={events.image}
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold text-sm"
                  >
                    {events.title}
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    {events.description.length > 50
                      ? `${events.description.substring(0, 50)}...`
                      : events.description}
                  </Typography>
                  <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-gray-400 text-xs dark:text-black">Place:{events.place}</span>
                  <span className="text-sm font-medium text-gray-400 text-xs dark:text-black">Date:{formatDate(events.Date_time)}</span>
                </div>
                

                
                <div className="flex gap-4">
                <div>
                  <Button onClick={() => handleReadMore(events)} className="w-full">ReadMore</Button>
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

              <div className="flex items-center justify-center mt-4">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-4 py-2 rounded-l-md bg-blue-500 text-white disabled:bg-gray-300 disabled:text-gray-500"
  >
    Previous
  </button>
  <span className="px-4 py-2 text-gray-700">
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-4 py-2 rounded-r-md bg-blue-500 text-white disabled:bg-gray-300 disabled:text-gray-500"
  >
    Next
  </button>
</div>
      
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default EventHome;
