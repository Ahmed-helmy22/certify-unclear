 import { useNavigation } from "react-router-dom";

const SearchBtn = ({formBtn}) => {
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";

  return (
    <button 
        type="submit" 
        className={`btn btn-block ${formBtn && 'form-btn'}`}
    >  
      {isSubmitting ? "Searching" : "search"}
    </button>
  );
};

export default SearchBtn;
