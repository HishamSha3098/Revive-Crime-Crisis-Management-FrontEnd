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



export function Profile() {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const datas = await authorsTableData();
      setTableData(datas);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUserBlock = (email, online) => {
    // Determine the action based on the current state
    const action = online ? 'Block' : 'Unblock';
    // Show a confirmation dialog using SweetAlert
    Swal.fire({
      title: 'Confirm Action',
      text: `Are you sure you want to ${action} the user with email ${email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${action} it!`,
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(email, 'this is params email');
          // Perform the block/unblock action based on the current state
          const active = await axios.post('http://127.0.0.1:8000/user_manage/', {
            email: email,
          });
      
          if (active.data.message) {
            console.log(active.message);
            // Use SweetAlert for the success message
            Swal.fire({
              title: 'Success',
              text: active.data.message,
              icon: 'success',
            });
            await fetchData(); // Use await to wait for the data to be fetched before updating the state
          } else {
            console.log('nothing happened');
          }
        } catch (error) {
          console.error(`Error ${action}ing user:`, error);
          // Use SweetAlert for error message
          Swal.fire({
            title: 'Error',
            text: `An error occurred while ${action}ing the user.`,
            icon: 'error',
          });
        }
      } else {
        console.log(`${action} operation canceled.`);
      }
    });
  };
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
            User List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["User", "Disc", "status", "Volunteer", "Action"].map((el) => (
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
                ({ img, name,volunteer, email, phone, online }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={`http://127.0.0.1:8000/${img}`} alt={name} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone[0]}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {phone[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "Active" : "Blocked"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={volunteer ? "green" : "blue-gray"}
                          value={volunteer ? "True" : "False"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        {online?
                        <Button
                          onClick={()=>handleUserBlock(email,online)}
                          className="text-xs bg-red-500 font-semibold text-gray-100"
                        >
                          Block
                        </Button>:<Button
                          onClick={()=>handleUserBlock(email)}

                          className="text-xs bg-green-500 font-semibold text-gray-100"
                        >
                          UnBlock
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

export default Profile;
