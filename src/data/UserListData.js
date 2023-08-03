import axios from "axios";

async function authorsTableData() {
  try {
    // Make an API request to Django to fetch the user data
    const response = await axios.get("http://127.0.0.1:8000/user_list/");
    const data = response.data;
    console.log(data);

    // Transform the fetched data into the desired format
    const transformedData = data.map((user) => ({
      img: user.img,
      name: user.name,
      volunteer : user.volunteer,
      email: user.email,
      phone: user.phone,
      online: user.online,
    }));

    return transformedData;
  } catch (error) {
    console.error("Error fetching authors table data:", error);
    return []; // Return an empty array in case of an error
  }
}

export default authorsTableData;
