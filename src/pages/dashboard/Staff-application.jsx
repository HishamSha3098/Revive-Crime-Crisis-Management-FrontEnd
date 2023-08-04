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
  
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
// import { Input } from 'formik';
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import authorsTableData from "@/data/UserListData";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import { API_URL } from "@/Config/config";



export function StaffApplication() {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/staff-application/`)
      setTableData(response.data);
      console.log(response.data,'this is data from back--------');
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    const handleApprovel =async (email)=>{

      try {
        const response = await axios.put(`${API_URL}/make-staff/${email}`)
        
        console.log(response.data,'this is data from back--------');
        toast.success("Approvel Success")
      } catch (error) {
        toast.error("error")
        console.error('not worked', error);
      }


    }


  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          {/* <div className="mb-10 flex items-center justify-between gap-6"> */}
         
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Staff Application List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["User", "Department", "IdCard", "status", "Action"].map((el) => (
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
              {tableData.map(
                (table , key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={`${API_URL}/${table.image}`} alt={name} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {table.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {table.department}
                        </Typography>
                        
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {table.id_card}
                        </Typography>
                        
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={table.is_aproved === true ? "green" : "blue-gray"}
                          value={table.is_aproved === true ? "Approved" : "Pending"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      
                      <td className={className}>
                        {table.is_aproved !== true ?
                        <Button
                          onClick={()=>handleApprovel(table.email)}
                          className="text-xs bg-red-500 font-semibold text-gray-100"
                        >
                          Approve
                        </Button>:<Button
                          type="disabled"

                          className="text-xs bg-gray-500 font-semibold text-gray-100"
                        >
                          Approved
                        </Button>
                        }
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
    </>
  );
}

export default StaffApplication;
