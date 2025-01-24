import axios from "axios"

const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/user-details", {
        withCredentials: true, 
      });
      return response.data
    } catch (error) {
      console.error("Error fetching user details:", error.response?.data || error.message);
    }
  };

export default fetchUserDetails