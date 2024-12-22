import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";

function App() {
  const url = "https://bookstoremernproject.onrender.com";
  return (
    <>
      <Routes>
        <Route path="/" element={<Home url={url} />} />
        <Route path="/books/create" element={<CreateBook url={url} />} />
        <Route path="/books/details/:id" element={<ShowBook url={url} />} />
        <Route path="/books/edit/:id" element={<EditBook url={url} />} />
        <Route path="/books/delete/:id" element={<DeleteBook url={url} />} />
      </Routes>
    </>
  );
}

export default App;
