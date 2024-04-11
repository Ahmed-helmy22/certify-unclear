 import companies from '../../compnies.json'

export const FormRowSelectLeanitExternal = ({ value ,onChange , className }) => {
   return (
    <div className="form-row">
     
      <select
        name='leeCompany'
        id='leeCompany'
        className={className || "form-select"}
        onChange={onChange}
        value={value}
      
      >
        {companies.map((itemValue) => {
          <option value="" defaultValue="">Select an Company</option>
          return (
            <option value={itemValue.value} key={itemValue.id} style={{paddingTop: '1.5rem'}}>
     
              {itemValue.innerHTML}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelectLeanitExternal;