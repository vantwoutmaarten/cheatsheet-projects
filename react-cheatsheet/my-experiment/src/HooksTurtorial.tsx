import { useEffect, useState } from "react";
import { MoodEmoji } from "./MoodEmoji";

import Ref from "./Ref";
import ReducerComponent from "./ReducerComponent";

interface HooksTurtorialProps {
  name: string;
}

const HooksTurtorial = (props: HooksTurtorialProps) => {
  // UseState:
  // When state action change is called the component is updated and will rerender.
  // it returns the state, and the state action setter.
  const [count, setCount] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  //  UseEffect:
  //  is usefull for the different lifecycle events, didMount, didUpdate, willUnmount.
  //  Initially called after the first mount. called later when updated.
  //  Takes a function you define as first argument, and an array of dependencies as second argument. dont forget or it will run on every render.
  // If you want it to run only once, pass an empty array as second argument.
  // The callback that is returned will run before unmounting/removing it from the dom.
  // normally a library like axios is used to fetch data from an api.

  useEffect(() => {
    alert("hello side effect");

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoaded(true);
      });

    return () => {
      console.log("unmounting");
      alert("goodbye component!");
    };
  }, []);

  return (
    <div>
      HooksTurtorial
      {props.name}
      <div>
        SHOWING USESTATE:
        <h2>Count is {count}</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
        SHOWING USEEFFECT:
        {loaded ? <h2>Loaded</h2> : <h2>Loading...</h2>}
      </div>
      <MoodEmoji />
      <Ref />
      <ReducerComponent />
    </div>
  );
};

export default HooksTurtorial;
