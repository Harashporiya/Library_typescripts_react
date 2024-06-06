import React, { FormEvent, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { addNewBooks, getAuthorisation } from '../ServiceAPI.tsx/ApiFetch';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookAdd: React.FC = () => {
    const [bookName, setBookName] = useState<string>("");
    const [authorName, setAuthorName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [data, setData] = useState(null);

    const navigator = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const token = Cookies.get("authorization");

        const newBook = { bookName, authorName, bookImageURL: imageUrl };
        try {
            const response = await addNewBooks(newBook, token);
            toast.info(response.message, { position: "top-right" });
            setBookName("");
            setAuthorName("");
            setImageUrl("");
        } catch (error) {
            console.error("Error adding new book:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAuthorisation();
                setData(response);
            } catch (error) {
                // navigator("/login");
                console.error(error, "error");
            }
        }

        fetchData();
    }, [navigator]);

    return (
        <>
            <Navbar />
            <div className="bg-gray-800 min-h-screen flex items-center justify-center p-9">
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
            </div>
            <ToastContainer />
        </>
    );
};

export default BookAdd;
