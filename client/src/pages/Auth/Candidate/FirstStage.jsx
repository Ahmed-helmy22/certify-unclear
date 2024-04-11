import { FaUser } from "react-icons/fa";
import { GiEgyptianProfile } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";

const FirstStage = ({ inputData, setInputData ,handleInputChange ,inputErrors}) => {
 
  const handleFileChange = (property) => (event) => {
    const file = event.target.files[0];
    console.log(file);
    setInputData({
      ...inputData,
      [property]: file,
    });
  };

  
  return (
    <>
      <div className="input-box">
        <div className="input-field">
          <input
            type="text"
            name="firstName"
            placeholder="first name"
            onChange={handleInputChange}
            required
            value={inputData.firstName}
          />
          {inputErrors.firstName && <p className="error-message">{inputErrors.firstName}</p>}

          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="middleName"
            placeholder="middle name"
            onChange={handleInputChange}
            required
            value={inputData.middleName}

          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="familyName"
            placeholder="family name"
            onChange={handleInputChange}
            required
            value={inputData.familyName}

          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="date"
            name="DOBirth"
            placeholder="Date of birth"
            onChange={handleInputChange}
            value={inputData.DOBirth}

          />
          <SlCalender className="icon" />
        </div>
      </div>

      <div className="input-box">
        <div className="gender-input">
          <span>Male</span>
          <div className="input-field">
            <input
              type="radio"
              placeholder="gender"
              name="gender"
              className="gender"
              value="male"
              onChange={handleInputChange}
              checked={inputData.gender === "male"}
            />
          </div>
          <span>Female</span>
          <div className="input-field">
            <input
              type="radio"
              placeholder="gender"
              name="gender"
              className="gender"
              value="female"
              onChange={handleInputChange}
              checked={inputData.gender === "female"}
            />{" "}
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="candidateProfilePhoto" className="label-image">
            Profile Image
          </label>
          <input
            type="file"
            name="candidateProfilePhoto"
            accept="image/*"
            placeholder="Profile image"
            required
            className="file-image"
            onChange={handleInputChange}

          />
          {inputData.candidateProfilePhoto && (
                      <img
                        src={URL.createObjectURL(
                          inputData.candidateProfilePhoto
                        )}
                        alt="Profile Preview"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    )}
          <GiEgyptianProfile className="icon" />
        </div>
      </div>
    </>
  );
};

export default FirstStage;
