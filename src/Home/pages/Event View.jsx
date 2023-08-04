import { Avatar, Typography, Button ,Input,Card, Select, Option,CardHeader,CardBody, } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import {PageTitle, Footer } from "@/Home/widgets/layout";
import React, { useEffect, useRef, useState } from "react";
import ComplexNavbar from "@/widgets/layout/navbar";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import LoadingSpinner from "@/utils/loadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
// import GoogleMapPicker from "react-google-map-picker";
import LocationMap from "@/utils/LocationMap";
import { API_URL } from "@/Config/config";





export function EventView() {
  const [isLoading, setIsLoading] = useState(false);
  const [progressvalue , setProgressValue] = useState({})
  const [Event, setEvent] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  const postTitle = "Awesome Post Title";
  const postUrl = window.location.href;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () =>{
    try {
      console.log(id ,'its evnt is to backend');
      const response = await axios.get(`${API_URL}/Event-single/${id}/`);
      console.log('API Response:', response.data);
  
      // Access the crisis data from the response
      const eventData = response.data;
      console.log('Event Data:', eventData);
  
      // Assuming you have updated the 'Crisis' state accordingly, set it with the fetched data
      setEvent(eventData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const data = [
    {
      label: "Description",
      value: "Description",
      desc: Event.description,
    },
    {
      label: "Place and Time",
      value: "Place and Time",
      desc: [ Event.place," ",Event.date_time],
    },
   
    {
      label: "Location",
      value: "location",
      desc: `Click the button below to download the file.`,
      downloadUrl: `${API_URL}/fileDownload/${id}/`, // Update this with your Django endpoint URL
    },
  ];

  

  // const handleDownload = () => {
  //   const fileDownloadUrl = data.find((item) => item.value === "download")?.downloadUrl;
  //   if (fileDownloadUrl) {
  //     axios.get(fileDownloadUrl, { responseType: "blob" }).then((response) => {
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", "CrisisProof.pdf"); // Update the filename here if needed
  //       document.body.appendChild(link);
  //       link.click();
  //     });
  //   }
  // };



  const ShareButton = ({ postTitle, postUrl }) => {
    const handleShare = async (onClick) => {
      try {
        if (navigator.share) {
          // If the Web Share API is supported, use it to trigger native sharing
          await navigator.share({
            title: postTitle,
            text: "Check out this post!",
            url: postUrl,
          });
        } else {
          // If the Web Share API is not supported, show an error message or provide a fallback method
          alert("Sharing is not supported on this device/browser.");
          // You can implement a custom sharing method here, like showing a share modal
          // or copying the post URL to the clipboard
        }
      } catch (error) {
        // Handle any errors that might occur during sharing
        console.error("Error sharing the post:", error);
      }
    }; 
    return (
      <div className="cursor-pointer" onClick={handleShare}>
      <ShareIcon className="h-6 w-6 text-blue-500" />
    </div>
    );
  };

  
  const lat = Event.lat
  const lng = Event.lng

  return (
    
    <>

<section className="relative block h-[50vh]">
  <div
    className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://revive-crime-crisis-management-front-end-oiwj.vercel.app/public/img/banner-events.jpg')] bg-cover bg-center"
  />

  <div className="absolute top-0 h-full w-full bg-black/75" />
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

{/* <div className="container mx-auto">
          <PageTitle heading="Extending a Helping Hand">
          Together, we can be a beacon of hope amidst the storms of crisis. Your donation can make a difference in the lives of these facing adversity.
          </PageTitle>
         
        </div> */}
        
       
        <div className="container mx-auto md:flex md:flex-row md:gap-4">
  {/* Image */}
  <div className="md:w-1/2 p-4">
    <img src={`${API_URL}/${Event.image}`} alt="Crisis Image" />
  </div>

  {/* Description */}
  <div className="md:w-1/2 p-4">
    <div className="mb-4">
      <h2 className="text-xl font-bold">{Event.title} </h2>
      <p>
        Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia sunt asperiores ab voluptate molestias? Fugiat est, culpa error totam voluptate id consectetur distinctio, vitae itaque in tempora animi voluptas repellat. consectetur, adipisicing elit. Ratione, ea? Asperiores nobis a dolores omnis dicta nam illum vero, iste modi suscipit, accusantium ducimus voluptates quibusdam tempore? Illum, tempore aspernatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dicta dignissimos quod ut tempore, eum totam, voluptas, debitis amet molestias quos iure. Vitae libero, dicta quam nesciunt provident est similique.
      </p>
      <br/>
      <div className="flex">
      {/* <div className="mr-2">
        <Button className="w-full bg-green-500">Donate</Button>
      </div> */}
      <div className="flex items-center justify-center"  >
        <ShareButton  postTitle={postTitle} postUrl={postUrl} />&nbsp;&nbsp;Share this Event
      </div>
    </div>
  



    </div>
  </div>
</div>
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
    <Tabs id="custom-animation" value="html" style={{ width: '100%', '@media (min-width: 601px)': { width: '70%' } }}>
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
          {value === "location" ? (
            <>
              <p>{desc}</p>
              <div>
      <LocationMap lat={lat} lng={lng} />
    </div>
            </>
          ) : (
            desc
          )}
        </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </div>
    

    <br/>
      
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default EventView;
