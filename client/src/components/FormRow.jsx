const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
  value,
  placeholder,
  required,
  accept,
  disabled
}) => {
  const inputValue = value !== undefined ? value : "";

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        accept={accept || ""}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ""}
        onChange={onChange}
        placeholder={placeholder || ""}
        required={required || ""}
        disabled={disabled || ''}
      />
    </div>
  );
};

export default FormRow;
