import  { useMemo  } from "react";
import { useCountries } from "use-react-countries";
 
const CountryCallingCode = ({ value, onChange , name}) => {
  const { countries } = useCountries();
   const countriesCode = useMemo(() => {
    return countries.map((country) => ({
      code: country.countryCallingCode,
      flags: country.flags.png,
   
    }));
  }, [countries]);
  return (
    <div className="form-row">
      <label htmlFor="country" className="form-label">
        Code
      </label>
      <select
        name={name}
        id="countrycode"
        className="form-select"
        onChange={(e) => onChange({ target: { value: e.target.value } })}
        value={value}
      >
        {countriesCode.map(({ code }) => {
           return (
            <>
            <option key={code} value={code}>
              {code}
             
            </option>
            </>
          );
        })}
      </select>
    </div>
  );
};

export default CountryCallingCode;
