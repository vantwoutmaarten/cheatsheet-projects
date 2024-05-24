import { useContext } from "react";
import { MyContext } from "./Provider";

const ThemeShower = () => {
  const context = useContext(MyContext);
  return (
    <div>
      <h1>ThemeShower</h1>
      <h1>{context.themeColor}</h1>
      <button onClick={() => context.setThemeColor("Dark")}></button>
    </div>
  );
};

export default ThemeShower;
