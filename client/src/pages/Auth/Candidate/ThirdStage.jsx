import { FaPassport } from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";

const ThirdStage = ({ inputData, setInputData, handleInputChange }) => {
  const handleFileChange = (property) => (event) => {
    const file = event.target.files[0];
     setInputData({
      ...inputData,
      [property]: file,
    });
  };
  return (
    <>
      <div className="input-box" style={{ width: "100%" }}>
        <div className="input-field" style={{ width: "100%" }}>
          <input
            type="text"
            name="qualification"
            placeholder="qualification"
            required
            style={{ width: "100%" }}
            onChange={handleInputChange}
            value={inputData.qualification}
          />
          <MdOutlineTitle className="icon" />
        </div>
      </div>
      <div className="input-box">
        <div className="input-field">
          <input
            type="text"
            name="occupation"
            placeholder="occupation"
            required
            onChange={handleInputChange}
            value={inputData.occupation}
          />
          <MdOutlineTitle className="icon" />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="PassportNumber"
            placeholder="passport no."
            required
            onChange={handleInputChange}
            value={inputData.PassportNumber}
          />
          <FaPassport className="icon" />
        </div>

        <div className="input-field">
          <label htmlFor="candidatePassportPhoto" className="label-image">
            Passport Image
          </label>
          <input
            type="file"
            accept="image/*"
            placeholder="passport"
            required
            name="candidatePassportPhoto"
            onChange={handleInputChange}
          />
          {inputData.candidatePassportPhoto && (
            <img
              src={URL.createObjectURL(inputData.candidatePassportPhoto)}
              alt="Profile Preview"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
          )}
          <FaPassport className="icon" />
        </div>
        <div className="input-field">
          <label htmlFor="candidateVerificationPhoto" className="label-image">
            Verification Image
          </label>
          <input
            type="file"
            name="candidateVerificationPhoto"
            accept="image/*"
            placeholder="passport"
            required
            onChange={handleInputChange}
          />
          {inputData.candidateVerificationPhoto && (
            <img
              src={URL.createObjectURL(inputData.candidateVerificationPhoto)}
              alt="Profile Preview"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
          )}
          <FaPassport className="icon" />
        </div>
      </div>
    </>
  );
};

export default ThirdStage;
