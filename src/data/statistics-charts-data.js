import { API_URL } from "@/Config/config";
import { chartsConfig } from "@/configs";
import axios from "axios";
import { useEffect, useState } from "react";

const CrisisChart = {
  type: 'bar',
  height: 220,
  series: [
    {
      name: 'Views',
      data: [], // Initialize with an empty array
    },
  ],
  options: {
    ...chartsConfig,
    colors: '#fff',
    plotOptions: {
      bar: {
        columnWidth: '16%',
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    },
  },
};

const DailyComplaintChart = {
  type: 'line',
  height: 220,
  series: [
    {
      name: 'Sales',
      data: [], // Initialize with an empty array
    },
  ],
  options: {
    ...chartsConfig,
    colors: ['#fff'],
    stroke: {
      lineCap: 'round',
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  },
};


// const completedTasksChart = {
//   ...dailySalesChart,
//   series: [
//     {
//       name: "Tasks",
//       data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
//     },
//   ],
// };



const StatisticsComponent = () => {
  const [crisisData, setCrisisData] = useState([]);
  const [complaintData, setComplaintData] = useState([]);

  const fetchChartData = async () => {
    try {
      const Response = await axios.get(`${API_URL}/dashboard-counts/`); // Replace '/api/crisis' with your actual API endpoint for crisis data
       // Replace '/api/complaints' with your actual API endpoint for complaints data


      console.log((Response.data,'---------------------------hhhhh-------------------'));
      setCrisisData(Response.data.crisis_count);
      setComplaintData(Response.data.complaint_count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []); // Empty dependency array ensures the effect runs only once, on component mount

  // Now you can use the crisisData and complaintData to update the CrisisChart and DailyComplaintChart
  useEffect(() => {
    CrisisChart.series[0].data = crisisData; // Assuming crisisData is an array with the crisis data
  }, [crisisData]);

  useEffect(() => {
    DailyComplaintChart.series[0].data = complaintData; // Assuming complaintData is an array with the complaint data
  }, [complaintData]);

  // The rest of your component code...
};



export const statisticsChartsData = [
  {
    color: "blue",
    title: "Crsis",
    description: "Last Campaign Performance",
    footer: "campaign sent 2 days ago",
    chart: CrisisChart,
  },
  {
    color: "pink",
    title: "Daily Complaints",
    description: "15% increase in today sales",
    footer: "updated 4 min ago",
    chart: DailyComplaintChart,
  },
  // {
  //   color: "green",
  //   title: "Completed Tasks",
  //   description: "Last Campaign Performance",
  //   footer: "just updated",
  //   chart: completedTasksChart,
  // },
];

export default statisticsChartsData;
