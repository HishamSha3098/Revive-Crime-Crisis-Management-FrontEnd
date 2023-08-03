import { Avatar, Typography, Button ,Input } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/Home/widgets/layout";
import React, { useEffect, useState } from "react";
import ComplexNavbar from "@/widgets/layout/navbar";
import { useFormik } from "formik";
import LoadingSpinner from "@/utils/loadingSpinner";
import { useNavigate } from "react-router-dom";
import { ProfileSchema } from "@/yup";
import axios from "axios";





export function UserProfile2() {

  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user_id = localStorage.getItem("user_id");

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  console.log(user_id,"this user id from localstorage----")

  useEffect(() => {
    console.log("use");
    // Check if user_id exists before making the API call
    console.log("--------------dfdfd----------dfdf--------------dfdf---------");
    console.log(user_id, "-----------=========-this user id from localStorage");
    console.log("dvjwedvjwhedgouiwhejhjtuftoyihljkhjcg ufygiuohiljbkhvj");
    if (user_id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/user_data/", {
            params: {
              user_id: user_id,
            },
          });
          console.log(response);
  
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/login");
        }
      };
  
      fetchUserData();
    } else {
      navigate("/login"); // Redirect to login page if user_id is invalid
    }
  }, []);
 
console.log(userData);
  

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

  return (
    
    <>

      <section className="relative bloc k h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://innova-it.co.il/wp-content/uploads/2018/12/bg.jpg')] bg-cover bg-center" />

        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />

      </section>
      <LoadingSpinner />

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
                <div className="mt-10 flex w-full justify-center  px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <Button onClick={handleToggleForm} className="bg-blue-400">Edit Profile</Button>
                  <Button onClick={handleToggleForm} className="bg-blue-400">Edit Profile</Button>
                  <Button onClick={handleToggleForm} className="bg-blue-400">Edit Profile</Button>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        22
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Friends
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
                        Photos
                      </Typography>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        89
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Comments
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                
                </Typography>
                <div className="mb-16 flex items-center justify-center gap-2">
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                  {userData.email}
                  </Typography>
                </div>
               
              </div>

              <div className={`flex flex-wrap ${showForm ? 'visible' : 'hidden'}`}>
               <form onSubmit={formik.handleSubmit}>

  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      name="name"
      id="name"
      // value={userData.name}
      placeholder="gyg"
      label="Name"
     
    />

  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="email"
      name="email"
      id="email"
      placeholder=""
      label="Email"
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <select
      id="marital_status"
      name="marital_status"
      onChange={formik.handleChange}
      className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    >
      <option value="">Select an option</option>
      <option value="married">Married</option>
      <option value="single">single</option>
      <option value="widowed">widowed</option>
      <option value="none">none</option>

    </select>
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      name="address"
      label="Address"
      id="address"
    //   placeholder={userData.address}
      
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      name="phone"
      id="phone"
      label="Phone"
    //   placeholder={userData.phone}
     
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      name="age"
      id="age"
      label="Age"
    //   placeholder={userData.age}
     
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      id="blood_group"
      name="blood_group"
    //   placeholder={userData.blood_group}
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      id="field6"
      name="field6"
      label="Field 6"
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Button type="submit" className="bg-blue-900">
      Submit
    </Button>
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

export default UserProfile2;
