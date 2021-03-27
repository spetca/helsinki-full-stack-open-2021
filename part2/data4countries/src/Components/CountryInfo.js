const Languages = ({ languages }) => {
  return (
    <>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
    </>
  );
};

const DisplayFlag = ({ flag }) => {
  // Import result is the URL of your image
  return <img src={flag} alt="flag" height="50" width="50" />;
};

const DisplayWeather = (props) => {
  return (
    <>
      <div>temperature: {props.weather.temperature}</div>
      <img
        src={props.weather.weather_icons[0]}
        alt="flag"
        height="50"
        width="50"
      />
      <div>
        wind: {props.weather.wind_speed} mph direction {props.weather.wind_dir}
      </div>
    </>
  );
};

const BasicInfo = (props) => {
  return (
    <>
      <p>capital {props.info.capital}</p>
      <p>population {props.info.population}</p>
    </>
  );
};

const CountryInfo = ({ country, weather }) => {
  console.log("countryinfo", weather);
  return (
    <>
      <h2>{country.name}</h2>
      <BasicInfo info={country} />
      <h3>Languages</h3>
      <Languages languages={country.languages} />
      <DisplayFlag flag={country.flag} />
      <h3>Weather</h3>
      {weather ? <DisplayWeather weather={weather} /> : null}
    </>
  );
};

export default CountryInfo;
