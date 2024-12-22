import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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
      <h1 className="text-3xl my-4">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-300 rounded-xl w-fit p-4 mt-16 text-left">
          <div className="my-4">
            <span className="font-semibold text-xl mr-4 text-gray-400">
              Id:{" "}
            </span>
            <span>{books._id}</span>
          </div>
          <div className="my-4">
            <span className="font-semibold text-xl mr-4 text-gray-400">
              Title:{" "}
            </span>
            <span>{books.title}</span>
          </div>
          <div className="my-4">
            <span className="font-semibold text-xl mr-4 text-gray-400">
              Author:{" "}
            </span>
            <span>{books.author}</span>
          </div>
          <div className="my-4">
            <span className="font-semibold text-xl mr-4 text-gray-400">
              Publish Year
            </span>
            <span>{books.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="font-semibold text-xl mr-4 text-gray-400">
              Create Time:
            </span>
            <span>{new Date(books.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="font-semibold text-xl mr-4 text-gray-400">
              Last Updated Time:{" "}
            </span>
            <span>{new Date(books.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
