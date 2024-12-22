/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import MessageBox from "../components/message/MessageBox";

const EditBook = ({ url }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:8000/books/${id}`).then((res) => {
      setLoading(true);
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setPublishYear(res.data.publishYear);
    });
  }, []);
  function handleEditBook() {
    const data = { title, author, publishYear };
    setLoading(true);
    if (!title || !author || !publishYear) {
      alert("Please fill out all fields!");
      return;
    }
    axios
      .put(`${url}/books/${id}`, data)
      .then(() => {
        setShowMessage(true);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("Some error occured,Please try again!");
      });
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-blue-300  rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => {
              setPublishYear(e.target.value);
            }}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-400 hover:opacity-80"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
      {showMessage ? <MessageBox message="edited" /> : ""}
    </div>
  );
};

export default EditBook;
