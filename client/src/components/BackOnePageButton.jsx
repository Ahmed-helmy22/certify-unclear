import { Link, useNavigate } from "react-router-dom";

const BackOnePageButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
     navigate(-1);
  };
  return (
    <div style={{ display: "flex", gap: "2rem", justifyContent: "end" }}>
      <Link className="btn closBtnExaminer" onClick={handleBackClick}>
        Back
      </Link>
    </div>
  );
};

export default BackOnePageButton;
