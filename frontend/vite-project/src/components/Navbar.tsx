import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

interface UserData {
  name?: string;
 
}

function Navbar() {
  const [userData, setUserData] = useState<UserData>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("authorization");
      
      try {
        const response = await axios.get("http://localhost:7000/data", {
          headers: { authorization: token },
        });

        setUserData(response.data);
        // console.log(response.data);
      } catch (error) {
        // navigate("/login");
        console.log("Error", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-bold">Library App</div>
        <div className="flex space-x-4">
          <Link to="/login" className="text-gray-300 text-2xl hover:text-white">{userData.name ? userData.name : 'Login'}</Link>
          <Link to="/BookShow" className="text-gray-300 text-2xl hover:text-white">Home</Link>
          <Link to="/BookAdd" className="text-gray-300 text-2xl hover:text-white">Add Book</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
