
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

type BackButtonProps = {
  label?: string;
  to?: number | string;
  className?: string;
};

const BackButton = ({ label = "Back", to = -1, className = "" }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof to === "number") navigate(to);
    else navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 text-sm px-4 py-2 bg-white border rounded-md shadow hover:bg-gray-100 transition ${className}`}
    >
      <FiArrowLeft />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
