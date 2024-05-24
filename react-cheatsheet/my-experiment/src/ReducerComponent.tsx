import { useReducer } from "react";
import { reducer } from "./Reducer";

const ReducerComponent = () => {
  // useReducer is a hook that is used to manage state in a more complex way than useState.
  // it does this similar to the redux pattern.
  // Instead of directupdates, you batch actions which go to a reducer function, and the reducer function determines how to update the state.
  // the first value is the state, the second value is the dispatch function.
  // the dispatch function can take an action object with a type.

  //  with more components and more complex state, useReducer is a better choice.
  // it takes the initial state as a second argument.
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      Reducer
      <div>
        <h2>Reducer Count is {state}</h2>
        <button onClick={() => dispatch({ type: "increment" })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: "decrement" })}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default ReducerComponent;
