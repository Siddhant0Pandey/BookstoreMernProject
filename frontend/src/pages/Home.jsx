import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

import Spinner from "../components/Spinner";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-green-500 text-3xl hover:scale-90 rounded-md" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md bg-orange-400">
                No
              </th>
              <th className="border border-slate-600 rounded-md bg-green-400">
                Title
              </th>
              <th className="border border-slate-600 rounded-md max:md-hidden bg-blue-400">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max:md-hidden bg-cyan-400">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md bg-purple-400">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((books, index) => (
              <tr key={index} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {books.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max:md-hidden">
                  {books.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max:md-hidden">
                  {books.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center ">
                  <div className="flex justify-evenly text-2xl">
                    <Link
                      to={`/books/details/${books._id}`}
                      title="books detail"
                    >
                      <BsInfoCircle className="text-blue-800 hover:scale-90" />
                    </Link>
                    <Link to={`/books/edit/${books._id}`} title="edit the list">
                      <AiOutlineEdit className="text-yellow-600 hover:scale-90" />
                    </Link>
                    <Link
                      to={`/books/delete/${books._id}`}
                      title="delete the list"
                    >
                      <MdOutlineDelete className="text-red-700 hover:scale-90" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
