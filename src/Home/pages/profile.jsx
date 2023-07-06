import { Avatar, Typography, Button ,Input, Select, Option } from "@material-tailwind/react";
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





export function UserProfile() {

  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user_id = localStorage.getItem("user_id");
  console.log(user_id,"this user id from localstorage----")
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // // Check if user_id exists before making the API call
    // console.log("--------------dfdfd----------dfdf--------------dfdf---------");
    // console.log(user_id, "-----------=========-this user id from localStorage");
    console.log("dvjwedvjwhedgouiwhejhjtuftoyihljkhjcg ufygiuohiljbkhvj");
    if (user_id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/user_data/", {
            params: {
              user_id: user_id,
            },
          });
  
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/login");
        }
      };
  
      fetchUserData();
    } else {
      navigate("/login"); // Redirect to login page if user_id is invalid/
    }
  }, [user_id, navigate]);

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

      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                      <Avatar
                        src="https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png"
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 w-full justify-center grid gap-2 px-4 md:grid-cols-3 lg:grid-cols-3 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <Button onClick={handleToggleForm} className="bg-blue-400">Edit Profile</Button>
                  <Button onClick={handleToggleForm} className="bg-blue-400">complaints</Button>
                  <Button onClick={handleToggleForm} className="bg-blue-400">My Crisis</Button>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        10K
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Total Doantion
                      </Typography>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        10
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Volunteer Score
                      </Typography>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        #
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        #
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                {userData.email}
                </Typography>
                <div className="mb-16 flex justify-center gap-2">
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                  {userData.address}<br/>
                  {userData.phone}<br/> Age:{userData.age}  Blood Group:{userData.blood_group}<br/>
                  Martial Status:{userData.Martial_Status}
                  {/* {userData.age},{userData.blood_group} */}
                  </Typography>
                </div>
               
              </div>

              <div className={`flex flex-wrap justify-center ${showForm ? 'visible' : 'hidden'}`}>
               <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      name="name"
      id="name"
      // value={userData.name}
      // placeholder={userData.name}
      label="Name"
      className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm ${
        formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-gray-300'
      }`}
      {...formik.getFieldProps("email")}
    />

  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="email"
      name="email"
      id="email"
      
      label="Email"
      className={`sm:text-sm ${
        formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'
      }`}
      {...formik.getFieldProps("email")}
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Select
      id="marital_status"
      name="marital_status"
      label="Martial_Status"
      onChange={formik.handleChange}
      // className="0 w-full"
    >
      {/* <option value="">Select an option</option> */}
      <Option value="married">Married</Option>
      <Option value="single">single</Option>
      <Option value="widowed">widowed</Option>
      <Option value="none">none</Option>

    </Select>
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      name="address"
      label="Address"
      id="address"
      
      className={`sm:text-sm ${
        formik.errors.address && formik.touched.address ? 'border-red-500' : 'border-gray-300'
      }`}
      {...formik.getFieldProps("address")}
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      name="phone"
      id="phone"
      label="Phone"
      
      className={`sm:text-sm ${
        formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'border-gray-300'
      }`}
      {...formik.getFieldProps("phone")}
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      name="age"
      id="age"
      label="Age"
      
      className={`sm:text-sm ${
        formik.errors.age && formik.touched.age ? 'border-red-500' : 'border-gray-300'
      }`}
      {...formik.getFieldProps("age")}
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      id="blood_group"
      name="blood_group"
      
      className={`sm:text-sm ${
        formik.errors.blood_group && formik.touched.blood_group ? 'border-red-500' : 'border-gray-300'
      }`}
      {...formik.getFieldProps("blood_group")}
      label="Blood-Group"
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
  {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input"></label> */}
  <Input className="w-full text-sm text-gray-900 border border-gray-900 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" label="File upload" type="file" />
  </div>
  
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Button type="submit" className="bg-blue-900">
      Submit
    </Button>
  </div>
  </div>

  </form>
  
</div>

            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default UserProfile;
