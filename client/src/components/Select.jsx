 
export const Select = ({ name, labelText , className , classNameLabel , children}) => {
    return (
      <div className="form-row">
        <label htmlFor={name} className={classNameLabel || "form-label"}>
          {labelText || name}
        </label>
        <select name={name} id={name}>
            {children}
        </select>
      </div>
    );
  };
  
  export default Select;