// Reducers,
// they do not directly update the store, they take the state update the state and replace the whole store state.
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import { increment, incrementAsync } from "./state/counter/counterSlice";

export const ReduxShow = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  const clickDispatchIncr = () => {
    dispatch(increment());
  };

  return (
    <div>
      <h1>ReduxShow</h1>
      <h1>Redux Count:{count}</h1>
      <button onClick={clickDispatchIncr}>Incr</button>
      <button onClick={() => dispatch(incrementAsync(10))}>Incr</button>
    </div>
  );
};
