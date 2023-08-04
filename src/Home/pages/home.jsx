import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  FormControl,
  Select,
  MenuItem,
  Textarea
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer, } from "@/Home/widgets/layout";
import { FeatureCard, TeamCard } from "@/Home/widgets/cards";
import { featuresData, teamData, contactData } from "@/Home/data";
// import ComplexNavbar from "@/widgets/layout/navbar";
// import { TextareaAutosize, FormControl, InputLabel, Select, MenuItem } from '@material-tailwind/react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/utils/loadingSpinner";
import { API_URL } from "@/Config/config";


export function Home() {

  const [selectedOption, setSelectedOption] = useState('');
  const [choices, setChoices] = useState([]);
  const [email, setEmail] = useState('');
  const [idCard, setIdCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user_id = localStorage.getItem('user_id');


  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () =>{
    const response =await axios.get(`${API_URL}/department/`)
    .then(response => {
      console.log(response.data);
      setChoices(response.data);
    })
    .catch(error => {
      console.error('Error fetching choices:', error);
    });

   
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value, 'Selected option');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleIdCardChange = (event) => {
    setIdCard(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    setIsLoading(true)
    event.preventDefault();
   
    // Create form data to send to Django
    const formData = new FormData();
    formData.append('email', email);
    formData.append('id_card', idCard);
    formData.append('sector', selectedOption);
    console.log(email,'its selcted option sumbit mode');
    axios.post(`${API_URL}/Staff-apply/`, formData) // Replace with your Django API endpoint to handle the form submission
    .then(response => {
      // Handle the response from Django, if needed
      setIsLoading(false)
      console.log(response.data);
      if (response.data.message === 'success'){
        toast.success("Application Submitted Successfully")
      }else{
        toast.error("Application failed")
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
    });
};


  return (
    
    <>
{/* <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
    
    <ComplexNavbar />
       
      </div> */}
       {isLoading && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-50"
          aria-hidden="true"
        >
          <LoadingSpinner/>
        </div>
      )}
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        
        <div className="absolute top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1510472306330-201b18c210fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&w=1000&q=80')] bg-cover bg-center" />
        
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Your are the Heroes.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae minus sed assumenda? Eveniet, necessitatibus alias. Officiis perspiciatis quibusdam iure animi dolores inventore rerum optio totam laudantium. Cum ipsam fugiat cumque!
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                <UsersIcon className="h-6 w-6 text-blue-gray-900" />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Working with us is a pleasure
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis molestias, harum doloremque similique laudantium quos saepe, hic alias ipsa ut dolorum facilis recusandae reprehenderit accusantium sunt natus magni eaque eius.
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore consequuntur error maxime at expedita ratione illo nihil repellendus, impedit vitae quisquam quasi, reiciendis doloremque adipisci saepe asperiores fugiat rerum! Sequi?
              </Typography>
              <Button variant="outlined">read more</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg shadow-gray-500/10">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src="https://cdn.pixabay.com/photo/2021/04/09/11/01/donation-6164135_640.png"
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
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle heading="Here are our heroes">
            According to the National Oceanic and Atmospheric Administration,
            Ted, Scambos, NSIDClead scentist, puts the potentially record
            maximum.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-lg fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-blue-gray-50/50 py-24 px-4">
        <div className="container mx-auto">
          <PageTitle heading="Build something">
            Put the potentially record low maximum sea ice extent tihs year down
            to low ice. According to the National Oceanic and Atmospheric
            Administration, Ted, Scambos.
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-white shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          {user_id ?
          (<div>
          <PageTitle heading="Want to Become a Sector Staff?">
            Complete this form and we will get back to you(officials Only).
          </PageTitle>
          <form className="mx-auto mt-12 max-w-3xl text-center" onSubmit={handleSubmit}>
            <div className="mb-8 grid lg:grid-cols-2 gap-8">
              <Input variant="standard" type="email" size="lg" onChange={handleEmailChange} name="email" label="Email Address" />
              <Input type="file" variant="standard" onChange={handleIdCardChange} size="lg" label="Upload Your Id Card" />
            </div>
            
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Choose Your Sector</option>
        {choices.map(choice => (
          <option key={choice.value} value={choice.value}>
            {choice.name}
          </option>
        ))}
      </select>
      
    
            <Button variant="gradient" size="lg" type="submit" className="mt-8">
              Apply for Staff
            </Button>
          </form>
          </div>):null}
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Home;
