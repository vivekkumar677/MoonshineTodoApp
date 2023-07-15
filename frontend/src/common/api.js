import axios from "axios";

const API = axios.create({ baseURL: "https://momentum-backend.onrender.com/"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
});

// for Authentication

export const signIn = (userData) => API.post("/users/signin", userData);
export const signUp = (userData) => API.post("/users/signup", userData);

// for CRUD features

export const fetchNotes = () => API.get("/notes");
export const createNote = (newNote) => API.post("/notes", newNote);
export const updateNote = (id, updateNote) => API.patch(`/notes/${id}`, updateNote);
export const deleteNote = (id) => API.delete(`/notes/${id}`);
export const updateNoteChecked = (id) => API.get(`/notes/${id}`);

// for novu implementation

export const sendSms = (note) => API.post("/notes/send-sms", note);
export const sendEmail = (note) => API.post("/notes/send-email", note);
export const deleteInApp = (note) => API.post("/notes/delete", note);