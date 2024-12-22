import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleDeleteBook() {
    setLoading(true);
    axios.delete(`http://localhost:8000/books/${id}`).then(() => {
      setLoading(false);
      navigate("/");
    });
  }

  function handleCancelDelete() {
    setLoading(false);

    navigate("/");
  }
  useEffect(() => {
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-blue-300  rounded-xl w-[600px] p-4 mx-auto gap-4">
        <h3 className="text-2xl">
          Are you sure, you want to delete{" "}
          <em>
            <b>{`${books.title}`}</b>
          </em>
          ?
        </h3>
        <button
          className="p-4 border text-gray-600 hover:border-green-500 "
          onClick={handleCancelDelete}
        >
          Cancel
        </button>
        <button
          className="p-4 bg-red-600 text-white hover:opacity-80"
          onClick={handleDeleteBook}
        >
          Yes, delete the book!
        </button>
      </div>
      ;
    </div>
  );
};

export default DeleteBook;
