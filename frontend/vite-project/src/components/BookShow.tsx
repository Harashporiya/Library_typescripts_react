import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { getBookAll } from '../ServiceAPI.tsx/ApiFetch';

interface Book {
    _id: string;
    bookName: string;
    authorName: string;
    bookImageURL: string;
}

function BookShow() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const books = await getBookAll();
            if (books) {
                setBooks(books);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (bookId: string) => {
        try {
            await axios.delete(`http://localhost:7000/book/delete/${bookId}`);
            setBooks(books.filter(book => book._id !== bookId));
        } catch (error) {
            console.log("Error deleting book:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-900 min-h-screen p-9">
                <div className="container mx-auto">
                    <h1 className="text-white text-3xl mb-6">Book List</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <div key={book._id} className="bg-blue-700 p-6 rounded-2xl">
                                <img src={book.bookImageURL} className="w-full h-48 object-cover rounded-md mb-4" />
                                <div className='flex justify-between'>
                                    <div>
                                        <h2 className="text-white text-xl">{book.bookName}</h2>
                                        <p className="text-gray-300">{book.authorName}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleDelete(book._id)}
                                            className='bg-red-600 p-4 rounded-xl text-white'>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookShow;
