const Filter = (props) => {
  return (
    <>
      <div>
        filter:
        <input value={props.newFilter} onChange={props.handleNewFilter} />
      </div>
    </>
  );
};

export default Filter;
