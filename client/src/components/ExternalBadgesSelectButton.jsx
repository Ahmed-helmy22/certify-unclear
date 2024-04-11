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
  const [selectFields, setSelectFields] = useState([]);
  const [inputValues, setInputValues] = useState();

  const [availableOptions, setAvailableOptions] = useState(
    data.externalWebsites
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
    <div style={{ width: 500 }}>
      <label htmlFor="" className="form-label">
        Select external badge
      </label>
      {selectFields.map((selectField, indexItem) => (
        <div
          key={indexItem}
          className="form-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr .5fr",
            justifyItems: "center",
            alignContent: "center",
            gap: "1rem",
            width: "500px",
          }}
        >
          <input
            type="text"
            className="form-input"
            defaultValue={selectField.selectedValue}
            name={selectField.id}
            id={selectField.id}
            hidden
          />
          {/* <label htmlFor="">{selectField.selectedValue}</label> */}
          {selectField.selectedValue === "leeanit" && (
            <>
              <input
                type="text"
                className="form-input"
                defaultValue="leeanit"
                name="leeanit"
                id={selectField.id}
                disabled
              />
              <input type="text" name="registrationNo" className="form-input" />
              <FormRowSelectLeanitExternal />
            </>
          )}
          {selectField.selectedValue === "myCert" && (
            <>
              <input
                type="text"
                className="form-input"
                defaultValue="myCert"
                name="myCert"
                id={selectField.id}
                disabled
              />
              <input type="text" name="myCert" className="form-input" />
            </>
          )}
          {selectField.selectedValue === "ITRA" && (
            <>
              <input
                type="text"
                className="form-input"
                defaultValue="irata"
                name="irata"
                id={selectField.id}
                disabled
              />
              <input type="text" name="irata" className="form-input" />
            </>
          )}
 {selectField.selectedValue !== "ITRA" && selectField.selectedValue !== "myCert"  && selectField.selectedValue !== "leeanit" ? (
            <>
              <input
                type="text"
                className="form-input"
                defaultValue={selectField.selectedValue}
                name={selectField.selectedValue}
                id={selectField.id}
                disabled
              />
              <input type="text" name={selectField.selectedValue} className="form-input" />
            </>
          ) : ''}
           
            <button
              style={{
                border: "1px",
                borderRadius: 100,
                width: 20,
                height: 20,
                cursor: 'pointer'
              }}
              
              onClick={cancelSelectedField}
              id={selectField.selectedValue}
            >
              X
            </button>
         
        </div>
      ))}

      <select
        name=""
        id=""
        className="form-select"
        onChange={handleSelectChange}
      >
        <option value="" defaultValue="">
          Select an option
        </option>
        {data.externalWebsites.map((option, index) => (
          <option key={index} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExternalBadgesSelectButton;
