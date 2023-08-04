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
import { API_URL } from "@/Config/config";






export function GalleryPost() {
  const [isLoading, setIsLoading] = useState(false);
  const [progressvalue , setProgressValue] = useState({})
  const [Gallery, setGallery] = useState([]);
  const navigate = useNavigate();
  // const location = useLocation();
  // const id = location.state?.id;

  const postTitle = "Awesome Post Title";
  const postUrl = window.location.href;

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () =>{
    try {
     
      const response = await axios.get(`${API_URL}/gallery/`);
      console.log('API Response:', response.data);
  
      // Access the crisis data from the response
      const galleryData = response.data;
      console.log('Event Data:', galleryData);
  
      // Assuming you have updated the 'Crisis' state accordingly, set it with the fetched data
      setGallery(galleryData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  

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

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const formattedDate = dateObj.toISOString().slice(0, 16).replace("T", " ");
    return formattedDate;
  }
  

  return (
    
    <>

<section className="relative block h-[50vh]">
  <div
    className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/banner-gallery.jpg')] bg-cover bg-center"
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
        
       
        
      {Gallery.map((post, index) => (
        <div className="container mx-auto md:flex md:flex-row md:gap-4" key={index}>
          {/* Image */}
          <div className="md:w-1/2 p-4">
            <img src={post.image} alt="Crisis Image" />
          </div>

          {/* Description */}
          <div className="md:w-1/2 p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold">{post.title} </h2>
              <p>
                {post.description}
              </p>
              <br/>
              <div className="flex">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                <svg className="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                {formatDate(post.Date_time)}
              </span>
                <div className="flex items-center justify-center">
                  <ShareButton postTitle={post.title} postUrl={post.url} />&nbsp;&nbsp;Share this Event
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    
   
    
    

    <br/>
      
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default GalleryPost;
