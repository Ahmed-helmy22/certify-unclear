import { useState } from "react";
import ExternalLeeCountrySecond from "../../../components/ExternalLeeCountrySecond";

const FourthStage = ({ data, inputData, setInputData  ,handleInputChange }) => {
  const [selectFields, setSelectFields] = useState([]);
  const [inputValues, setInputValues] = useState();


  
  const itraWebsite = data?.externalWebsites.find(
    (website) => website.title === "IRATA"
  );
  const myCertWebsite = data?.externalWebsites.find(
    (website) => website.title === "MYCERT"
  );
  const leeanitWebsite = data?.externalWebsites.find(
    (website) => website.title === "LEEA"
  );
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const valueExists = selectFields.find(
      (field) => field.selectedValue === selectedValue
    );
    if (!valueExists) {
      const newSelectedField = [
        ...selectFields,
        { id: selectFields.length + 1, selectedValue },
      ];
      setSelectFields(newSelectedField);
    }
  };

  const cancelSelectedField = (e) => {
    const selectedValue = e.target.id;
    const updatedSelectFields = selectFields.filter(
      (item) => item.selectedValue !== selectedValue
    );
    const updatedInputValues = { ...inputValues };
    delete updatedInputValues[selectedValue];
    setSelectFields(updatedSelectFields);
    setInputValues(updatedInputValues);
  };
  return (
    <>
      <div className="" style={{ display: "grid" }}>
        {selectFields.map((selectField, indexItem) => (
          <div key={indexItem} style={{ display: "flex" }}>
            {selectField.selectedValue === "LEEA" && (
              <div className="input-box3">
                <input
                  type="text"
                  className="input-field"
                  value={inputData.leeWebsiteId =leeanitWebsite._id}
                   name="leeWebsiteId"
                  id={selectField.id}
                  disabled
                  hidden
                  style={{display: 'none'}}
                 />

                <div className="input-field">
                  <ExternalLeeCountrySecond className="input-field"  onChange={handleInputChange}/>
                </div>

                <input 
                  type="text"
                  name="leeRegNumber"
                  className="input-field"
                  placeholder="LEEEA reg no"
                  onChange={handleInputChange}
                  value={inputData.leeRegNumber}
                />
              </div>
            )}
            {selectField.selectedValue === "MYCERT" && (
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  value={inputData.mycertWebsiteId = myCertWebsite._id}
                   name="mycertWebsiteId"
                  id={selectField.id}
                  disabled
                  hidden
                 />
                <input
                  type="text"
                  name="myCertRegNumber"
                  className="input-field"
                  placeholder="my Cert"
                  onChange={handleInputChange}
                  value={inputData.myCertRegNumber}
                />
              </div>
            )}
            {selectField.selectedValue === "IRATA" && (
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  value={inputData.itraWebsiteId = itraWebsite._id}
                  name="itraWebsiteId"
                   id={selectField.id}
                  disabled
                  hidden
                 />
                <input
                  type="text"
                  name="itraRegNumber"
                  className="input-field"
                  placeholder="irata Reg Number"
                  onChange={handleInputChange}
                  value={inputData.itraRegNumber}
                />
                 <input
                  type="text"
                  name="itraName"
                  className="input-field"
                  placeholder="irata Reg name"
                  onChange={handleInputChange}
                  value={inputData.itraName}
                />
              </div>
            )}
            {selectField.selectedValue !== "IRATA" &&
            selectField.selectedValue !== "MYCERT" &&
            selectField.selectedValue !== "LEEA" ? (
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                   name={selectField.selectedValue}
                  id={selectField.id}
                  disabled
                />
                <input
                  type="text"
                  name={selectField.selectedValue}
                  className="input-field"
                  onChange={handleInputChange}
                 />
              </div>
            ) : (
              ""
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "1rem",
              }}
            >
              <button
                style={{
                  border: "1px",
                  borderRadius: 100,
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                }}
                onClick={cancelSelectedField}
                id={selectField.selectedValue}
              >
                X
              </button>
            </div>
          </div>
        ))}

        <select name="" id="" className="form-select" onChange={handleSelectChange}>
          <option defaultValue="">Select an option</option>
          {data?.externalWebsites?.map((option, index) => (
            <option key={index} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FourthStage;
