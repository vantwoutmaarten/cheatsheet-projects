import React, { useMemo } from "react";

export const MemoComponent = () => {
  const [count, setCount] = React.useState<number>(0);

  // useMemo is useful to remeber values that are expensive to compute. Primary to prevent unnecesary computation.
  // it does not directly influence the amount of rerenders of this component.
  // it does influence the rerenders of a child when the value is passed as a prop.
  const expensiveCount = useMemo(() => {
    // some expensive comp
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
  }, [count]);

  return (
    <div>
      MemoComponent
      <div>
        <h2>Count is {count}</h2>
        <h2>Expensive Count is {expensiveCount}</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          Increment
        </button>
        {/* expensiveCount as prop */}
        {/* <ExpensiveComponent expensiveProp={expensiveCount} /> */}
      </div>
    </div>
  );
};

// UseImperativeHandler.

// with ref you access the dom elements.
// with forwardRef you can make the element available when someone uses the comp.
// useImperativeHandle is used to control and modify the methods on the native element.
// pretty rare.

// useLayoutEffect is used to do something after the dom has been updated,
// this runs after the rendering the component, but before they have been painted to the screen.
// meaning you can do something before the user sees the changes.
// so react will wait with visualizing before the useLayoutEffect is done.

// like calculating scroll postions.
//  useDebugValue is used to display a label for custom hooks in the react devtools.
//  makes it possible to define custom labels in the devtools for your custom hooks.
