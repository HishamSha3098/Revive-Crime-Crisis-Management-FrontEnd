import { Avatar, Typography, Button ,Input, Select, Option, Card, CardBody, Chip } from "@material-tailwind/react";
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
import { API_URL } from "@/Config/config";





export function UserProfile() {
  const [showForm, setShowForm] = useState(false);
  const [showCrisisTable, setShowCrisisTable] = useState(false);
  const [showComplaintTable, setShowComplaintTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user_id = localStorage.getItem('user_id');
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [showModal2, setShowModal2] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');

  // const [crisisId, setCrisisId] = useState(null);
  const [userData, setUserdata] = useState([]);
  const [complaintData, setComplaintdata] = useState([]);
  const [crisisData, setCrisisdata] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    image: null,
    age: '',
    blood_group: '',
    marital_status: '',
    address: '',
    phone:''


  });

  useEffect(() => {
    fetchUserData();
    fetchComplaintData();
  }, [showForm]);
  console.log("lll",formData.marital_status);

  const TABLE_HEAD = ["Department", "Case-ID", "Status"];
  // const TABLE_C_HEAD = ["Department", "Case-ID", "Status"];


  const fetchCrisistData = async () =>{

    try {
      const response = await axios.get(`${API_URL}/crisis_list-user/`,{
        params:{
          user_id : user_id
        }
      });

     
      setCrisisdata(response.data);

      console.log(formData,'its adter seting in get');
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }


  const fetchComplaintData = async () =>{

    try {
      const response = await axios.get(`${API_URL}/complaints/`,{
        params:{
          user_id : user_id
        }
      });
      setComplaintdata(response.data);

      console.log(formData,'its adter seting in get');
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

 const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/user_data/${user_id}/`);
      setUserdata(response.data);
      
      setFormData({
        id:userData.id,
        name:userData.name,
        email:userData.email,
        image:null,
        age:userData.age,
        blood_group:userData.blood_group,
        marital_status : userData.marital_status,
        address:userData.address,
        phone:userData.phone
        
      })

      console.log(formData,'its adter seting in get');
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(userData,'this is the data got');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(formData.image,"im in  input ");
    
    if (formData.image != null){
      console.log(formData.image,"im in if input");
      setFormData({ ...formData, [name]: value ,image:null});
    console.log(formData, 'this is handle file input sss');
  }else{
    console.log(formData.image,"im in else input ");

    setFormData({ ...formData, [name]: value});
    console.log(formData, 'this is handle file input 22');
  }

    
  };


  const handleToggleForm = () => {
    setShowForm(true);
  };

  const handleCrisisTable = ()=>{
    setShowCrisisTable(!showCrisisTable)
    fetchCrisistData();

  } 
  const handleComplaintTable = ()=>{
    setShowComplaintTable(!showComplaintTable)
    fetchCrisistData();

  }


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file }); // Corrected property name to 'image'
    console.log(formData, 'this is handle file input');
    
    if (e.target.name === 'image' && file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(formData.image,";;;");


  const handleFormSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
  
    try {
      const formValues = new FormData();
      formValues.append('name', formData.name);
      console.log(formData.name);
      formValues.append('email', formData.email);
      formValues.append('phone', formData.phone);
      formValues.append('age', formData.age);
      formValues.append('blood_group', formData.blood_group);
      formValues.append('marital_status', formData.marital_status);
      formValues.append('address', formData.address);
      
  
      if (formData.image) {
        formValues.append('image', formData.image);
      }
      
      
        // Update existing crisis
        console.log(formValues);
        const {data} = await axios.put(`${API_URL}/updateuser/${formData.id}/`, formValues);
        
        if (data.message === 'User Updated Successfully'){
          setIsLoading(false)
          toast.success("User Updated Successfully")
          fetchUserData()
        }
      // Clear the form data and fetch the updated crisis list only on successful submission
      // setFormData({
      //   id: null,
      //   name: '',
      //   email: '',
      //   image: null,
      //   age: '',
      //   blood_group: '',
      //   marital_status: '',
      //   address: '',
      //   phone:''
      // });
      // await fetchUserData();
    } catch (error) {
      console.error('Error submitting crisis:', error);
      // Handle the error here if needed
    }
  };
  

  const handleEditCrisis = (event) => {
    setFormData({
      id: event.id,
      title: event.title,
      place: event.place,
      Date_time: event.Date_time,
      description: event.description,
      image: null,
    });
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
                      {selectedImage?(
                      <Avatar
                        src="{selectedImage}"
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />):(<Avatar
                        src={userData.image}
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />)}
                    </div>
                  </div>
                </div>
                <div className="mt-10 w-full justify-center grid gap-2 px-4 md:grid-cols-3 lg:grid-cols-3 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <Button onClick={handleToggleForm} className="bg-blue-400">Edit Profile</Button>
                  <Button onClick={handleComplaintTable} className="bg-blue-400">complaints</Button>
                  <Button onClick={handleCrisisTable} className="bg-blue-400">My Crisis</Button>
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
                  Martial Status:{userData.marital_status}
                  {/* {userData.age},{userData.blood_group} */}
                  </Typography>
                </div>
               
              </div>

              <div className={`flex flex-wrap justify-center ${showForm ? 'visible' : 'hidden'}`}>
               <form onSubmit={handleFormSubmit}>
        <div>
          <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
  <Input
      type="text"
      name="name"
      id="name"
     
      value={formData.name}
      onChange={handleInputChange} 
      label="Name"
      className=''
      
    />

  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="email"
      name="email"
      id="email"
      value={formData.email}
      onChange={handleInputChange} 
      label="Email"
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
  <select
  id="marital_status"
  name="marital_status"
  value={formData.marital_status}
  onChange={(e) => handleInputChange(e)}
  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
  
><option value="">Choose Your Sector</option>
  <option value="married">Married</option>
  <option value="single">Single</option>
  <option value="widowed">Widowed</option>
  <option value="none">None</option>
</select>
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      name="address"
      label="Address"
      value={formData.address}
      id="address"
      onChange={handleInputChange} 
      
      
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      name="phone"
      id="phone"
      label="Phone"
      value={formData.phone}
      onChange={handleInputChange} 
      
      
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      name="age"
      id="age"
      onChange={handleInputChange} 
      value={formData.age}
      label="Age"
      
     
      
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
    <Input
      type="text"
      id="blood_group"
      name="blood_group"
      onChange={handleInputChange} 
      value={formData.blood_group}
      label="Blood-Group"
    />
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5">
  {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input"></label> */}
  <Input className="w-full text-sm text-gray-900 border border-gray-900 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" label="File upload" onChange={handleFileInputChange} type="file" />
  </div>
  
  </div>
  <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-5 gap-6">
    <Button type="submit" className="bg-blue-900 gap-3">
      Submit
    </Button>

    <Button onClick={() => setShowForm(false)} className="bg-red-600">
      Close
    </Button>
  </div>
  
    
  
  </div>

  </form>
  
</div>


      {/* complaints table */}

      <Card className={`h-full w-full overflow-scroll ${showComplaintTable ? 'visible' : 'hidden'}`}>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {complaintData.map((complaint,index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {complaint.department}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {complaint.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {complaint.status}
                </Typography>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    <br/>


{/* crisi table starts here */}

    <CardBody className={`overflow-x-scroll px-0 pt-0 pb-2 ${showCrisisTable ? 'visible' : 'hidden'}`}>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["img/Title", "Recived", "goal","status"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {crisisData.map(
                (crisis,key) => {
                  const className = `py-3 px-5 ${
                    key === crisisData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={crisis.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={`${API_URL}${crisis.img}`}
                           alt={crisis.title} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {crisis.title}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {/* {description}3 */}34567
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {crisis.recived_amount}
                        </Typography>
                        
                      </td>
                      
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {crisis.donation_goal}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={crisis.is_active ? "green" : "blue-gray"}
                          value={crisis.is_active ? "Active" : "Closed"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                    
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
    <br/>



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
