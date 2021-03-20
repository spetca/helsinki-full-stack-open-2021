import React, { useState } from "react";
const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const selectAnectdotes = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteForAnecdote = () => {
    let copy = { ...votes };
    copy[selected] += 1;
    setVotes(copy);
  };

  const getMax = () => {
    return Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b));
  };
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <div>has {votes[selected]} votes</div>
      <Button text="vote" handleClick={voteForAnecdote} />
      <Button text="next anecdote" handleClick={selectAnectdotes} />
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[getMax()]}</p>
      <div>has {votes[getMax()]} votes</div>
    </div>
  );
};

export default App;
