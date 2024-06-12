import axios from "axios";
import Cookies from "js-cookie"
const API_URL = "http://localhost:7000/";


export const getBookAll = async () => {
    try {
        const response = await axios.get(`${API_URL}book/book/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching book", error);
    }
}

export const addNewBooks = async (book: { bookName: string; authorName: string; bookImageURL: string }, token: string | undefined) => {
    try {
        const response = await axios.post(`${API_URL}book/add-new`, book, {
            headers: { authorization: `Bearer ${token} ` },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
};


export const getSignup = async (signup: { name: string; email: string; password: string; }) => {
    try {
        const response = await axios.post(`${API_URL}user/signup`, signup);
        return response.data;
    } catch (error) {
        console.error("Error signup:", error);
    }
}

export const getAuthorisation = async () => {
    try {
        const token = Cookies.get("authorization");
        const response = await axios.get(`${API_URL}data`, {
            headers: { authorization: token },
        });
        return response.data;
    } catch (error) {
        console.error("Error during authorization:", error);
        throw error;
    }
};
