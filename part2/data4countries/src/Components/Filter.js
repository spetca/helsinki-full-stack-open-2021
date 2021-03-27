const Filter = (props) => {
  return (
    <>
      <div>
        find countries:
        <input value={props.newFilter} onChange={props.handleNewFilter} />
      </div>
    </>
  );
};

export default Filter;
