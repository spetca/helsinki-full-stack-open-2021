import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import phonebookServices from "./services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    phonebookServices.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleOnClick = (event) => {
    event.preventDefault();
    let changedPerson = persons.filter((person) => person.name === newName);
    if (changedPerson.length > 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook replace old number with new?`
        )
      ) {
        console.log(changedPerson[0]);
        phonebookServices
          .update(changedPerson[0].id, {
            ...changedPerson,
            number: newPhoneNumber,
          })
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : response.data
              )
            );
          });
      }
    } else {
      let newEntryObject = { name: newName, number: newPhoneNumber };
      phonebookServices.create(newEntryObject).then((response) => {
        setPersons(persons.concat(response.data));
      });
    }
  };

  const handleDelete = (id) => {
    let copyObj = persons.filter((person) => person.id !== id);
    console.log(copyObj);
    if (window.confirm(`Do you really want to delete ${copyObj[0].name}`)) {
      phonebookServices
        .remove(id)
        .then((response) => {
          setPersons(copyObj);
        })
        .catch((error) => {
          alert(`error occured`, error);
        });
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

      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
