import { Link, useNavigate } from "react-router-dom";

const BackTowPagesButton = () => {
  const navigate = useNavigate();

  const handleBackClickTwo = () => {
    // Navigate back to the previous page
    navigate(-2);
  };
  return (
    <div style={{ display: "flex", gap: "2rem", justifyContent: "end" }}>
      <Link className="btn closBtnExaminer" onClick={handleBackClickTwo}>
        Close
      </Link>
    </div>
  );
};

export default BackTowPagesButton;
