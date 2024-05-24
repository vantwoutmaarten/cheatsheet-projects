import { useContext } from "react";
import MoodContext from "./MoodContext";

export const MoodEmoji = () => {
  const { currMood, setMood } = useContext(MoodContext);
  return (
    <div>
      <h1>MoodEmoji</h1>
      <p>Current mood is {currMood}</p>
      <button onClick={() => setMood("happy")}>Happy</button>
      <button onClick={() => setMood("sad")}>Sad</button>
      <button onClick={() => setMood("angry")}>Angry</button>
    </div>
  );
};
