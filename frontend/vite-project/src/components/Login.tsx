import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Cookies from 'js-cookie'


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
   const navigate= useNavigate()
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:7000/user/login", {
                email,
                password
            });
            console.log(response.data);
            Cookies.set("authorization", response.data.token);
            toast.info(response.data.message, { position: "top-right" });
            setEmail("");
            setPassword("");
            setTimeout(()=>{
                navigate("/BookShow")
            },6000)
            
        } catch (error) {
             console.error("Error during login:", error);
            //  toast.error(error.message, { position: "top-right" });
        }
    };

    return (
        <><Navbar/>
        <div className="bg-gray-800 min-h-screen flex items-center justify-center p-9">
        <form onSubmit={handleSubmit} className="bg-blue-400 max-w-md w-full mb-28 p-9 rounded-2xl space-y-4">
            <h1 className="text-grsy-900 font-bold text-2xl mb-4">Login</h1>
            <p className='mb-4 text-white font-semibold text-2xl'>Login to your account</p>
          <div>
            <p className='mb-4 text-white font-semibold text-xl'>
              Don't have an account yet? <Link to="/signup" className="text-blue-900">Signup</Link>
            </p>
          </div>
            <div>
                <label htmlFor="email"className="block text-xl font-bold text-gray-900">Email</label>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-xl font-bold text-gray-900">Password</label>
                <input
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <button type="submit" className="bg-sky-600 font-bold text-xl p-4 w-full text-white rounded-xl hover:bg-sky-700">
                    Login
                </button>
            </div>
        </form>
        <ToastContainer />
    </div>
    </>
    );
};

export default Login;
