import { Avatar, Typography, Button ,Input,Card, Select, Option,CardHeader,CardBody, } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/Home/widgets/layout";
import React, { useEffect, useRef, useState } from "react";
import ComplexNavbar from "@/widgets/layout/navbar";
import { useFormik } from "formik";
import LoadingSpinner from "@/utils/loadingSpinner";
import { useNavigate } from "react-router-dom";
import { ProfileSchema } from "@/yup";
import axios from "axios";
import { toast } from "react-hot-toast";





export function CausesHome() {

  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user_id = localStorage.getItem("user_id");
  console.log(user_id,"this user id from localstorage----")
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      blood_group: "",
      marital_status: "",
      address: "",
    },
    
    validationSchema: ProfileSchema,
    onSubmit: async (values) => {
      Object.keys(values).forEach((fieldName) => {
        // Remove the condition to allow updating values even if they are empty
       if (!values[fieldName]) {
          switch (fieldName) {
            case "name":
              values[fieldName] = userData.name;
              break;
            case "email":
              values[fieldName] = userData.email;
              break;
            case "phone":
              values[fieldName] = userData.phone;
              break;
            case "age":
              values[fieldName] = userData.age;
              break;
            case "blood_group":
              values[fieldName] = userData.blood_group;
              break;
            case "marital_status":
              values[fieldName] = userData.marital_status;
              break;
            case "address":
              values[fieldName] = userData.address;
              break;
            default:
              // Handle other fields here
              break;
        }
      }
      });
      
      try {
        setIsLoading(true); // Start showing the spinner
        const { data } = await axios.post(`http://127.0.0.1:8000/updateuser/${user_id}/`, values);
        
        if (data.message === 'User Updated Successfully'){
          toast.success("User Updated Successfully")
        } else {
          toast.error("User Updation Failed")
        }
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("User Updation Failed")
      } finally {
        setIsLoading(false);
      }
    },
    
  });
  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle file upload logic here
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    
    <>

      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://innova-it.co.il/wp-content/uploads/2018/12/bg.jpg')] bg-cover bg-center" />

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


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

<Card className="shadow-lg shadow-gray-500/10">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold"
                  >
                    Top Notch Services
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </Typography>
                  <div>
                  <Button className="w-full">Donate</Button>
                  </div>
                </CardBody>
              </Card>

              <Card className="shadow-lg shadow-gray-500/10">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold"
                  >
                    Top Notch Services
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </Typography>
                </CardBody>
              </Card>

              <Card className="shadow-lg shadow-gray-500/10">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold"
                  >
                    Top Notch Services
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </Typography>
                </CardBody>
              </Card>

              <Card className="shadow-lg shadow-gray-500/10">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold"
                  >
                    Top Notch Services
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </Typography>
                </CardBody>
              </Card>

              <Card className="shadow-lg shadow-gray-500/10 pt-6 ">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold"
                  >
                    Top Notch Services
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </Typography>
                </CardBody>
              </Card>

              
              </div>
      
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default CausesHome;
