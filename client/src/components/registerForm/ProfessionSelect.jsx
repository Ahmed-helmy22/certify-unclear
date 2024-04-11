 import styled from "styled-components";

  const StyledSelect = styled.select`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  outline: none;
  font-size: 16px;
  /* color: #fff; */
  border-radius: 6px;
  padding: 15px 15px 15px 40px;
  option{
    color: black;
  }
  /* Additional styling if needed */
`;

const ProfessionSelect = ({value , list,  name  ,onChange , className , classNameLabel}) => {
  return (
    <StyledSelect value={value} name={name || 'country'} onChange={onChange}   className={className}  classNameLabel={classNameLabel}>
      
        <option value="" disabled selected >
          
          Select a {name}
        </option>
        {list.map(({ name }) => {
          return (
            
            <option key={name} value={name}>
              {name}
            </option>
          );
        })}
      </StyledSelect>
  )
}

export default ProfessionSelect