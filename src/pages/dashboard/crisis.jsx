import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Chip,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Input,
  Textarea,
  Checkbox,
  
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
// import { Input } from 'formik';
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import authorsTableData from "@/data/UserListData";
import { useEffect, useState } from "react";
import CrisisTableData from "@/data/crisisListData ";
import axios from "axios";
import { Formik,Form, useFormik } from "formik";
import { toast } from "react-hot-toast";



export function Crisis() {
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');

  const [crisisId, setCrisisId] = useState(null);
  const [crises, setCrises] = useState([]);

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
    fetchCrises();
  }, []);

  const fetchCrises = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/crisis_list/');
      setCrises(response.data);
      console.log(crises,'this incomig data');
    } catch (error) {
      console.error(error);
    }
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
      if (formData.id !== null) {
        
        // formData.document = crises.document
      console.log(data);

        // If the crisis has an ID, it means it already exists and we should update it
       const response = await axios.post(`http://127.0.0.1:8000/update_crisis/${formData.id}/`, data);
       if (response.data.message === 'success'){
        toast.success("Crisis Updated Successfully")
        setShowModal(false)

       }else{
        toast.error("Crisis Updation failed")

       }
      } else {
      console.log(data);
      // If the crisis doesn't have an ID, it means it's a new crisis and we should add it
       const response = await axios.post('http://127.0.0.1:8000/add_crisis/', data);
        if (response.data.message == 'success'){
          toast.success("Crisis Added Successfully")
          setShowModal(false)
         }else{
          toast.error("Crisis Creation failed")
  
         }
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
      fetchCrises();
      console.log(existingImage);
      
      setSelectedImage(existingImage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (crisisId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/update_crisis/${crisisId}/`);
      fetchCrises();
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          
         
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          
          <Button className="end-2.5" onClick={setShowModal} variant="h6" color="white">
            Add New Crisis
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["img/Title", "Recived", "goal","status" ,"Edit"].map((el) => (
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
              {crises.map(
                (crisis,key) => {
                  const className = `py-3 px-5 ${
                    key === crises.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={crisis.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={`http://127.0.0.1:8000/${crisis.img}`} alt={crisis.title} size="sm" />
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
                      <td className={className}>
                        <a
                          as="a"
                          href="#"
                          onClick={() => {
                            setExistingImage(`http://127.0.0.1:8000/${crisis.img}`); // Set the existing image URL
                            setFormData({ ...crisis, id: crisis.id });
                            setShowModal(true)
                          }}
                          className="text-xs font-semibold text-blue-gray-600"
                          
                        >
                          Edit
                        </a>
                        <a onClick={() => handleDelete(crisis.id) }>Delete</a>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      

        </CardBody>
      </Card>
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
                    Add New Crisis
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
          <input id="dropzone_file" type="file" name="dropzone_file" onChange={handleFileInputChange} className="hidden" required />
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
      required
    />
 </div>
  <div className="w-full md:w-1/2 lg:w-1/4  px-4 h-10 mb-1 lg:mb-0">
   
    <Checkbox 
    value={formData.is_active}
    onChange={handleInputChange} 
    id="isActive" name="isActive" label="Active" />

  </div>
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
                    {formData.id ? 'Update Crisis' : 'Add Crisis'}
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

export default Crisis;