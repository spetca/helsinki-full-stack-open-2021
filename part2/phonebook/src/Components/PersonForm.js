const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleOnClick}>
        <div>
          name: <input value={props.newName} onChange={props.handleNewName} />
        </div>
        <div>
          number:
          <input
            value={props.newPhoneNumber}
            onChange={props.handleNewPhoneNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
