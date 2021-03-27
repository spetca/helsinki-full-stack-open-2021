import Country from "./Country";
import CountryInfo from "./CountryInfo";

const CountryList = (props) => {
  if (props.countries.length === 1) {
    return (
      <>
        {props.countries.map((country) => (
          <div key={country.name}>
            <CountryInfo country={country} weather={props.weather} />
          </div>
        ))}
      </>
    );
  }

  if (props.countries.length > 1 && props.countries.length < 10) {
    return (
      <>
        {props.countries.map((country) => (
          <div key={country.name}>
            <Country country={country} handleClick={props.handleClick} />
          </div>
        ))}
      </>
    );
  }
  return <>To many matches, specify another filter</>;
};

export default CountryList;
