import { useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import FormRowSelectLeanitExternal from "./FormRowSelectLeanitExternal";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/externalBadge/allWebsites");
    return { data };
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};

const ExternalBadgesSelectButton = () => {
  const { data } = useLoaderData();
  const [selectFields, setSelectFields] = useState([{ id: 1 }]);
  const [availableOptions, setAvailableOptions] = useState(data.externalWebsites);
  const [inputValues, setInputValues] = useState({});

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const newSelectFields = [...selectFields, { id: selectFields.length + 1, selectedValue }];
    setSelectFields(newSelectFields);

    // Filter out the selected option from available options
    setAvailableOptions(availableOptions.filter(option => option.id !== selectedValue));

    // Clear the input value associated with the selected option
    setInputValues({ ...inputValues, [selectedValue]: '' });
  };

  const handleCancel = (index) => {
    const canceledValue = selectFields[index]?.selectedValue;
    
    if (canceledValue) {
      const updatedSelectFields = [...selectFields];
      updatedSelectFields.splice(index, 1);
      setSelectFields(updatedSelectFields);
  
      // Add the canceled option back to available options
      const canceledOption = data.externalWebsites.find(option => option.id === canceledValue);
      
      if (canceledOption) {
        setAvailableOptions([...availableOptions, canceledOption]);
      }
  
      // Clear the input value associated with the canceled option
      setInputValues(prevValues => {
        const { [canceledValue]: _, ...updatedInputValues } = prevValues;
        return updatedInputValues;
      });
    }
  };

  const handleInputChange = (e, selectedValue) => {
    setInputValues({ ...inputValues, [selectedValue]: e.target.value });
  };

  return (
    <div style={{ width: 500 }}>
      <label htmlFor="" className="form-label">
        Select external badge
      </label>
      {selectFields.map((selectField, indexItem) => (
        <div key={indexItem} className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr', gap: '1rem', width: '500px' }}>
          <input
            type="text"
            name={selectField.id}
            id={selectField.id}
            // value={inputValues[selectField.selectedValue] || ''}
            defaultValue={selectField.selectedValue}
            onChange={(e) => handleInputChange(e, selectField.selectedValue)}
            className="form-input"
            disabled
          />
          {selectField.selectedValue === "leeanit" && <><input type="text" name="registrationNo" className="form-input" /> <FormRowSelectLeanitExternal /> </>}
          {selectField.selectedValue === "myCert" && <><input type="text" name="myCert" className="form-input" /> </>}
          {selectField.selectedValue === "ITRA" && <><input type="text" name="irata" className="form-input" /> </>}
          <span>
          <button type="button" onClick={() => handleCancel(indexItem)} className="btn">Remove</button>

          </span>
        </div>
      ))}
      <select name="" id="" className="form-select" onChange={handleSelectChange}>
        <option value="" defaultValue="">Select an option</option>
        {availableOptions.map((option, index) => (
          <option key={index} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExternalBadgesSelectButton;
