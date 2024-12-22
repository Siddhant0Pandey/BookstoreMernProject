import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <div className="flex">
      <Link to="/">
        <BsArrowLeft className="textx-2xl" />
      </Link>
    </div>
  );
}

export default BackButton;
