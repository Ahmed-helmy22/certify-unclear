import styled from "styled-components";
import companies from "../../compnies.json";

const StyledSelect = styled.select`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  outline: none;
  font-size: 16px;
  color: #fff;
  border-radius: 6px;
  padding: 15px 15px 15px 40px;
  option {
    color: black;
  }
 `;

const ExternalLeeCountrySecond = ({ value, onChange }) => {
   return (
    <>
    
    <StyledSelect name="leeCompany"  id='leeCompany' onChange={onChange} value={value}>
       {companies.map((itemValue) => {
        
        <option defaultValue="">Select an Company</option>;
        return (
          
          <option
            value={itemValue.value}
            key={itemValue.id}
            style={{ paddingTop: "1.5rem" }}
          >
            {itemValue.innerHTML}
          </option>
        );
      })}
    </StyledSelect>
    </>
  );
};

export default ExternalLeeCountrySecond;
