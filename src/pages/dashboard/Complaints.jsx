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
  Dropdown,
  DropdownItem
  
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  DocumentTextIcon,
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



export function ComplaintsView() {
  const [tableData, setTableData] = useState([]);
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Number of items to display per page
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = tableData.slice(startIndex, endIndex);



  useEffect(() => {
    fetchData();
  }, [status]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/complaints/`)
      setTableData(response.data);
      console.log(response.data,'this is data from back--------');
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  
  const handleDownload = async (complaintId) => {
    try {
      const response = await axios.post(`${API_URL}/complaints/`, {
        complaint_id: complaintId,
      }, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `complaint_${complaintId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading complaint:", error);
    }
  };



  const handleStatusChange = async (newStatus,id) => {
    console.log(id);
    try {
        const response = await axios.put(`${API_URL}/complaint/${id}/`,{
          status: newStatus,
          
        
      });

      if (response.data.message === 'success') {
        setStatus(newStatus);
        console.log("--------------successs--------------loded----------");
        toast.success("Complaint Status updated Successfully")

        // Do something after successful status update
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status")
      // Handle error if status update fails
    }
  };
    const statusOptions = ["Submitted", "Pending", "Resolved"];

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
            Complaint Managment
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["User", "Department", "Document", "status", "Action"].map((el) => (
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
              {visibleData.map(
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
                          <Avatar src={`${API_URL}${table.image}`} alt={name} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {table.name}
                              {/* {table.description} */}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {table.department}
                        </Typography>
                        
                      </td>
                      <td>
                        <button onClick={() => handleDownload(table.id)}>
                        <DocumentTextIcon className="w-6 h-6" />
                        </button>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={table.status === 'Resolved' ? "green" : "blue-gray"}
                          value={table.status === 'Resolved'  ? table.status : table.status}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td>
                      <select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value,table.id)}
                        className="bg-white border border-gray-300 rounded px-4 py-2"
                      >
                        <option value="">Choose</option>
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                     </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <div className="flex items-center justify-center mt-4">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-4 py-2 rounded-l-md bg-blue-500 text-white disabled:bg-gray-300 disabled:text-gray-500"
  >
    Previous
  </button>
  <span className="px-4 py-2 text-gray-700">
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-4 py-2 rounded-r-md bg-blue-500 text-white disabled:bg-gray-300 disabled:text-gray-500"
  >
    Next
  </button>
</div>


        </CardBody>
      </Card>
    </>
  );
}

export default ComplaintsView;
