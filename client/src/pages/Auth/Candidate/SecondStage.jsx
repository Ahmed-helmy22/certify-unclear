 import { FaHome, FaPhoneAlt, FaRegAddressCard } from "react-icons/fa";
import CountrySecond from "../../../components/CountrySecond";
import { CiInboxIn } from "react-icons/ci";

const SecondStage = ({ inputData, setInputData  ,handleInputChange , inputErrors}) => {
   
  return (
    <>
      <div className="input-box">
        <div className="input-field">
          <input
            type="number"
            name="phoneNumber"
            placeholder="phone number"
            required
             onChange={handleInputChange}
            value={inputData.phoneNumber}

          />
          <FaPhoneAlt className="icon" />
        </div>
        <div className="input-field">
          <CountrySecond
            onChange={handleInputChange}
            // value={inputData.country}
          />
          <FaHome className="icon" />
        </div>
      </div>

      <div className="input-box">
        <div className="input-field">
          <input
            type="text"
            name="city"
            placeholder="city"
            required
            onChange={handleInputChange}
            value={inputData.city}
            
          />
          <FaHome className="icon" />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="POBox"
            placeholder="po box"
            required
            onChange={handleInputChange}
            value={inputData.POBox}
            
          />
          <CiInboxIn className="icon" />
        </div>
      </div>
      <div className="input-box" style={{ width: "100%" }}>
        <div className="input-field" style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="address"
            name="address"
            style={{ width: "100%" }}
            onChange={handleInputChange}
            value={inputData.address}
             
          />
          <FaRegAddressCard className="icon" />
        </div>
      </div>
    </>
  );
};

export default SecondStage;
