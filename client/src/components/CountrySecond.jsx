import { useMemo } from "react";
import styled from "styled-components";
import { useCountries } from "use-react-countries";
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
  /* Additional styling if needed */
`;

const CountrySecond = ({ onChange, value, name }) => {
  const { countries } = useCountries();
  const countriesWithEmojis = useMemo(() => {
    return countries.map((country) => ({
      name: country.name,
      flags: country.flags.png,
    }));
  }, [countries]);
  return (
    <StyledSelect value={value} name={name || "country"} onChange={onChange}>
      <option value="" disabled selected>
        Select a country
      </option>
      {countriesWithEmojis.map(({ name }) => {
        return (
          <option key={name} value={name}>
            {name}
          </option>
        );
      })}
    </StyledSelect>
  );
};

export default CountrySecond;
