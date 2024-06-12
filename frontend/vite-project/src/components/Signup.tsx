import { FormEvent, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Cookies from 'js-cookie'


function Signup() {
  const [name, setName] = useState<string>(" ");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/user/signup", {
        name,
        email,
        password,
      })
      console.log(response.data);
      Cookies.set("authorization", response.data.token);
      toast.info(response.data.message, { position: "top-right" });
      setName("")
      setEmail("")
      setPassword("");
    } catch (error) {
      console.error("Error signing up:", error);
      // toast.error(err.message, { position: "top-right" });
    }
  }
  return (
    <>
      <Navbar />
      <div className="bg-gray-800 max-h-screen min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-blue-400 p-6 mb-28 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            <p className='mb-4 text-white font-semibold text-2xl'>Signup to create an account</p>


            <div>
              <p className='mb-4 text-white font-semibold text-xl'>
                Already have an account? <Link to="/login" className="text-blue-900">Login</Link>
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor='name' className="block text-xl font-bold text-gray-900">Name</label>
              <input
                type='text'
                id='name'
                value={name}
                placeholder='Enter your name'
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor='email' className="block text-xl font-bold text-gray-900">Email</label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor='password' className="block text-xl font-bold text-gray-900">Password</label>
              <input
                type='password'
                id='password'
                value={password}
                placeholder='Enter your password'
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button type='submit' className="bg-sky-600 font-bold text-xl p-4 w-full text-white rounded-xl hover:bg-sky-700">
              Signup
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>

    </>
  )
}

export default Signup
