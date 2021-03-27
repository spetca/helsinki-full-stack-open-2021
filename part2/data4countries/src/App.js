import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import CountryList from "./Components/CountryList";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      let responseObj = response.data;
      if (newFilter !== "") {
        let filteredCountries = responseObj.filter((country) => {
          return country.name.toLowerCase().includes(newFilter.toLowerCase());
        });
        console.log("filtered", filteredCountries);
        setCountries(filteredCountries);
      }
    });
  });

  useEffect(() => {
    console.log("useeffect country legnth", countries.length);
    if (countries.length === 1) {
      const capital = countries.map((country) => country.capital);
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API}&query=${capital}`
        )
        .then((response) => {
          console.log("capital", capital);
          console.log("weather", response.data["current"].temperature);
          setWeather(response.data["current"]);
        });
    }
  });

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const handleClick = (name) => {
    setNewFilter(name);
  };

  return (
    <div>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <CountryList
        countries={countries}
        weather={weather}
        handleClick={handleClick}
      />
    </div>
  );
};

export default App;
