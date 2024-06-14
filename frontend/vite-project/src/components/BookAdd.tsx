import React, { FormEvent, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const BookAdd: React.FC = () => {
    const [bookName, setBookName] = useState<string>("");
    const [authorName, setAuthorName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [userData, setUserData] = useState<any>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const token = Cookies.get("authorization");


            const response = await axios.post("http://localhost:7000/book/add-new", {
                bookName,
                authorName,
                imageUrl,
            }, {
                headers: { authorization: `Bearer ${token}` },
            });

            toast.info(response.data.message, { position: "top-right" });
            setBookName("");
            setAuthorName("");
            setImageUrl("");
        } catch (error) {
            console.error("Error adding new book:", error);
            toast.error("Failed to add the book. Please try again.", { position: "top-right" });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("authorization");

                console.log(token)
                const response = await axios.get("http://localhost:7000/data", {
                    headers: { authorization: token },
                });

                setUserData(response.data);
                // console.log(response.data.token)
            } catch (error) {
                console.log("Error", error);
                // navigate("/login");
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="bg-gray-900 min-h-screen flex items-center justify-center p-9">
                <form onSubmit={handleSubmit} className="bg-blue-700 p-9 rounded-2xl space-y-4">
                    <h1 className="text-white text-2xl mb-4">Add New Book</h1>
                    <div>
                        <label htmlFor="bookName" className="block text-white">Book Name</label>
                        <input
                            type="text"
                            value={bookName}
                            id="bookName"
                            placeholder="Enter book name"
                            onChange={(e) => setBookName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="authorName" className="block text-white">Author Name</label>
                        <input
                            type="text"
                            value={authorName}
                            id="authorName"
                            placeholder="Enter author name"
                            onChange={(e) => setAuthorName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-white">Image URL</label>
                        <input
                            type="url"
                            value={imageUrl}
                            id="imageUrl"
                            placeholder="Enter image URL"
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button type="submit" className="bg-sky-900 p-4 w-full text-white rounded-xl hover:bg-blue-900">
                            Submit
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    );
};

export default BookAdd;
