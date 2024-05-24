import { useRef } from "react";

const RefShown = () => {
  // useRef is used to create an immutable object that will keep the same reference between rerenders.
  // It is used to access the dom elements directly.
  // it can be used to change a value like with setState but it does not trigger a rerender.
  //  start by grabbing a native html element from the jsx.
  const ref = useRef<HTMLInputElement>(null);

  // then you can use ref to access dom element properties.
  // ref.current?.click() will click the button programmatically when you call the function.
  const clickIt = () => {
    if (ref.current) {
      ref.current.value = "Clicked!"; // Setting the value directly to indicate click
    }
  };

  // you can also use if for other things like setting the focus.
  const focusIt = () => {
    ref.current?.focus();
  };

  // you can also use it to get the value of an input field.
  const getValue = () => {
    console.log("value: ", ref.current?.value);
    if (ref.current) {
      ref.current.value = "value: " + ref.current?.value;
      // Setting the value directly to indicate click
    }
  };

  // or you can use it to set the value of an input field.
  const setValue = () => {
    ref.current!.value = "hello";
  };

  return (
    <div>
      RefShown
      <input ref={ref} type="text" placeholder="Type here..." />
      <button onClick={clickIt}>Click Input (non-standard)</button>
      <button onClick={focusIt}>Focus Input</button>
      <button onClick={getValue}>Get Value</button>
      <button onClick={setValue}>Set Value</button>
    </div>
  );
};

export default RefShown;
