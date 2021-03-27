import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleOnClick = (event) => {
    event.preventDefault();
    let inArray = persons.filter((person) => person.name === newName);
    if (inArray.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newPhoneNumber }));
    }
  };

  const personsToShow = showAll
    ? persons
    : persons.filter(
        (person) => person.name.toLowerCase() === newFilter.toLowerCase()
      );

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value);
    console.log(newFilter.length);
    if (newFilter.length > 1) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  const handleNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />

      <h3>Add a new</h3>

      <PersonForm
        handleOnClick={handleOnClick}
        handleNewName={handleNewName}
        handleNewPhoneNumber={handleNewPhoneNumber}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
