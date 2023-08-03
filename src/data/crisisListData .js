import axios from "axios";

async function CrisisTableData() {
  try {
    // Make an API request to Django to fetch the user data
    const response = await axios.get("http://127.0.0.1:8000/crisis_list/");
    const data = response.data;
    console.log(data);

    // Transform the fetched data into the desired format
    const transformedData = data.map((data) => ({
      id:data.id,
      img: data.img,
      title: data.title,
      description: data.description,
      donation_goal: data.donation_goal,
      recived_amount: data.recived_amount,
      recived_amount: data.recived_amount,
      is_active: data.is_active,
    }));

    return transformedData;
  } catch (error) {
    console.error("Error fetching authors table data:", error);
    return []; // Return an empty array in case of an error
  }
}

export default CrisisTableData;
