import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./Input";
import Users from "./Users";
import HooksTurtorial from "./HooksTurtorial";
import MoodContext, { MoodContextProvider, moods } from "./MoodContext";

function App() {
  const [count, setCount] = useState<number>(0);

  const updateParentState = (data: number): void => {
    setCount(data);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Input onChangeInput={updateParentState} />
        <h2>Count is {count}</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <MoodContextProvider>
          <HooksTurtorial name="All hooks explained" />
        </MoodContextProvider>
        <Users />
      </div>
    </>
  );
}

export default App;
