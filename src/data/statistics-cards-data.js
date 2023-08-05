import { API_URL } from "@/Config/config";
import { BanknotesIcon, UserPlusIcon, UserIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios


  const [statisticsCardsData, setStatisticsCardsData] = useState([
    {
      color: "blue",
      icon: BanknotesIcon,
      title: "Today's Money",
      value: null, // We'll fetch this value from the API
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "pink",
      icon: UserIcon,
      title: "Today's Users",
      value: null, // We'll fetch this value from the API
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "green",
      icon: UserPlusIcon,
      title: "New Clients",
      value: null, // We'll fetch this value from the API
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "orange",
      icon: ChartBarIcon,
      title: "Sales",
      value: null, // We'll fetch this value from the API
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ]);

  const fetchStatisticsCardsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-statistics-cards-data/`);
      setStatisticsCardsData((prevData) => [
        {
          ...prevData[0],
          value: response.data.todays_money,
        },
        {
          ...prevData[1],
          value: response.data.todays_users,
        },
        {
          ...prevData[2],
          value: response.data.new_clients,
        },
        {
          ...prevData[3],
          value: response.data.sales,
        },
      ]);
    } catch (error) {
      console.error("Error fetching statistics cards data:", error);
    }
  };

  useEffect(() => {
    fetchStatisticsCardsData();
  }, []);

  return statisticsCardsData;
};

export default StatisticsCards;
