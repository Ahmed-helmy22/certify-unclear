import { useMemo } from "react";
import { useCountries } from "use-react-countries";

const Country = ({ value, onChange, name, defaultValue }) => {
  const { countries } = useCountries();
  const countriesWithEmojis = useMemo(() => {
    return countries.map((country) => ({
      name: country.name,
      flags: country.flags.png,
    }));
  }, [countries]);
  return (
    <div className="form-row">
      <label htmlFor="country" className="form-label">
        country
      </label>
      <select
        name={name}
        id="country"
        className="form-select"
        onChange={onChange}
        value={value}
        defaultValue={defaultValue || ""}
      >
        {countriesWithEmojis.map(({ name, flags }) => {
          return (
            <option key={name} value={name}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Country;
