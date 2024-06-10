import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Movies() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<string>(" ");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("authorization");
        // console.log(token)
        const response = await axios.get("http://localhost:7000/data", {
          headers: { authorization: token }
        });
        setUserData(response.data);
      } catch (error) {
        // navigate('/login');
        console.log("Error", error);
      }
    };
    fetchData();
  }, [navigate]);
  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen flex flex-col items-center pt-32 space-y-4">
        <button
          onClick={() => navigate("/indiamovies")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Indian Movies
        </button>
        <button
          onClick={() => navigate("/ghost")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Ghost Movies
        </button>
      </div>
    </>
  );
}

export default Movies;
