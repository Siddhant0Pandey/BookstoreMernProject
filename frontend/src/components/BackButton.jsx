import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <div className="flex ">
      <Link to="/">
        <BsArrowLeft className=" bg-slate-600 text-white  text-2xl p-1 rounded-md" />
      </Link>
    </div>
  );
}

export default BackButton;
