import { Avatar, Typography, Button ,Input,Card, Select, Option,CardHeader,CardBody,Checkbox,Textarea, } from "@material-tailwind/react";
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
import { toast } from "react-hot-toast";
import { API_URL } from "@/Config/config";






export function CausesHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [progressvalue , setProgressValue] = useState({})
  const [Crisis, setCrisis] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const user_id = localStorage.getItem("user_id")
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    dropzone_file: null,
    donation_goal: '',
    // is_active: false,
    file: null,
  });

  useEffect(() => {
    fetchCrisis();
  }, []);

  const fetchCrisis = async () =>{
    const response =await axios.get(`${API_URL}/crisis_list/`)
    setCrisis(response.data)

   
  }

  const handleReadMore = (crisis) => {
    // Pass crisis.id as state while navigating
    navigate('/Causes-view', { state: { id: crisis.id } });
  };

  const handleDonate = (crisis) => {
    // Pass crisis.id as state while navigating
    navigate('/Checkout', { state: { id: crisis.id } });
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  

  const handleFileInputChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
    console.log(formData);
  
    if (name ==='dropzone_file'){
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(files[0]);
  }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.dropzone_file === null){
        toast.error("Please Upload image before Submission")
        return

      }
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          console.log("im in document if");

          if (key === 'document' && Array.isArray(value) && value.length === 0)  {
            console.log("im in document if");
            throw new Error('Please select a document file.');
          }
          console.log("im in document else");

          data.append(key, value);
        }
      });
      console.log(formData);
      
      console.log(data,'this is data for sending');
      data.append('user_side', user_id);
      // If the crisis doesn't have an ID, it means it's a new crisis and we should add it
       const response = await axios.post(`${API_URL}/add_crisis/`, data);
        if (response.data.message == 'success'){
          toast.success("Crisis Submitted Successfully")
          setShowModal(false)
         }else{
          toast.error("Crisis failed")
  
         }
      

      setFormData({
        id: null,
        title: '',
        description: '',
        dropzone_file: null,
        donation_goal: '',
        // is_active:false,
        file: null,
      });
     
      
      setSelectedImage(existingImage);
    } catch (error) {
      console.error(error);
    }
  }



  return (
    
    <>

<section className="relative block h-[50vh]">
  <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('http://localhost:5173/public/img/banner-crisis.jpg')] bg-cover bg-center" />

  <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />

  <div className="absolute flex items-center justify-center w-full h-full">
    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 w-60 rounded-full font-semibold" onClick={setShowModal}>
      Add Crisis
    </Button>
  </div>
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
                    src={`${API_URL}${crisis.image}`}
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
                    {crisis.description.length > 50
                      ? `${crisis.description.substring(0, 50)}...`
                      : crisis.description}
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
                  <Button onClick={() => handleReadMore(crisis)} className="w-full">ReadMore</Button>
                  </div>
                  <div>
                  
                  <Button onClick={() => handleDonate(crisis)} className="w-full bg-green-500">Donate</Button>
                  
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

      {showModal ? (
        // Modal Starts Here
        <>
        
                <form className="flex items-center justify-center w-full" onSubmit={handleFormSubmit}>

          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >

            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Apply for Crisis
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                
                <div className="relative p-6 flex-auto">
                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      <div className="w-full mb-2 md:col-span-3 lg:col-span-1">
        <label htmlFor="dropzone_file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {selectedImage ? (
            <img src={selectedImage} alt="Uploaded" className="w-full h-44 mb-3" />
          ) : (
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
          )}
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone_file" type="file" name="dropzone_file" onChange={handleFileInputChange} className="hidden" />
        </label>
      </div>
      <div className= "md:col-span-2 w-full  md:grid  md:grid-cols-2 ">
       <div className="w-full md:w-1/2 lg:w-1/4 px-4 py-0 h-10 lg:mb-0 md:mt-0 mb-1 mt-2">
    <Input
      type="text"
      name="title"
      id="title"
     
      value={formData.title}
      onChange={handleInputChange} 
      label="Title"
      className=''
      required
    />

  </div>
     
      

      
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 py-0 h-10 mb-1 lg:mb-0">
    <Input
      type="text"
      name="donation_goal"
      id="donation_goal"
      value={formData.donation_goal} 
      onChange={handleInputChange}
      label="Donation Goal"
      className=''
      required
    />

  </div>
 
<div className="w-full md:w-1/2 lg:w-1/4 px-4  mb-1 lg:mb-0">
    <Input
      type="file"
      name="file"
      id="file"
      // value={formik.values.file} 
      onChange={handleFileInputChange}
      label="Document Upload"
      className=''
      
    />
 </div>
  <input type="hidden" name="user_side" id="user_side"  onChange={handleInputChange}  value="user"/>
 <div className="w-full col-span-2 px-4">
    <Textarea
      type="text"
      name="description"
      value={formData.description}
      onChange={handleInputChange} 
      label="Description"
      id="description" 
      required
      className=''
    />
 </div>
 
  </div>


      </div>
    
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                   
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </form>
          

        </>
      ) : null}


    </>
  );
}

export default CausesHome;
