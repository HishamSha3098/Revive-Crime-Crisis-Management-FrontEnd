import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/Home/widgets/layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ComplaintRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [choices, setChoices] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [address, setAddress] = useState('');
  const [complaint, setComplaint] = useState('');
  const user_id = localStorage.getItem("user_id")
  const navigate = useNavigate()

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    const response = await axios.get('http://127.0.0.1:8000/department/')
      .then(response => {
        console.log(response.data);
        setChoices(response.data);
      })
      .catch(error => {
        console.error('Error fetching choices:', error);
      });
  }

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user', user_id);
    formData.append('name', name);
    formData.append('subject', subject);
    formData.append('address', address);
    formData.append('description', complaint);
    formData.append('department', selectedValue);

    // Append the file to the formData if a file is selected
    const fileInput = document.getElementById('file-upload');
    if (fileInput.files.length > 0) {
      formData.append('document', fileInput.files[0]);
    }
    console.log("FormData Object:", formData);

for (let pair of formData.entries()) {
  console.log(pair[0] + ": ", pair[1]);
}
   
    // Make the POST request using axios
    axios.post('http://127.0.0.1:8000/register_complaint/', formData)
      .then((response) => {
        toast.success("Complaint registered successfully")
        console.log('Complaint registered successfully:', response.data);
        navigate("/profile")
        
      })
      .catch((error) => {
        toast.error("Error registering complaint")
        console.error('Error registering complaint:', error);
      });
  };

  

  return (
    
    <>

<section className="relative block h-[50vh]">
  <div
    className="bg-profile-background absolute top-0 h-full w-full bg-[url('http://localhost:5173/public/img/banner-events.jpg')] bg-cover bg-center"
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
        
        <div className="w-full px-4 lg:px-8 xl:px-16">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Complaint Form
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Register Your Complaint Here.
          </Typography>
          <form className="mt-8 mb-2 max-w-screen-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="col-span-2">
                <select
                  id="marital_status"
                  name="marital_status"
                  size="lg"
                  value={selectedValue}
                  onChange={handleSelectChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                >
                  <option value="">Choose Your Sector</option>
                  {choices.map(choice => (
                    <option key={choice.value} value={choice.id}>
                      {choice.name}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                size="lg"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            
              <Input
                size="lg"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                size="lg"
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <Input type="file" size="lg" label="File Upload" id="file-upload" />
              <div className="col-span-2">
                <Textarea
                  type="text"
                  size="lg"
                  label="Brief Your Complaint"
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                />
              </div>
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-blue-500"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button type="submit" className="mt-6" fullWidth>
              Register Complaint
            </Button>
          </form>
        </Card>
      </div>

    <br/>
      
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default ComplaintRegister;
