const Persons = (props) => {
  return (
    <>
      {props.personsToShow.map((person) => (
        <p key={person.id}>
          <Person person={person} handleDelete={props.handleDelete} />
        </p>
      ))}
    </>
  );
};

const Person = (props) => {
  return (
    <>
      {props.person.name} {props.person.number}
      <button onClick={() => props.handleDelete(props.person.id)}>
        delete
      </button>
    </>
  );
};

export default Persons;
