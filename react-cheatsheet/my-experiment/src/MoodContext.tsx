import { createContext, useState } from "react";

type MoodType = {
  happy: string;
  sad: string;
  angry: string;
};

type MoodContextType = {
  currMood: string;
  setMood: (mood: keyof MoodType) => void;
};

export const moods: MoodType = {
  happy: ":-)",
  sad: ":-(",
  angry: ":-|",
};

const defaultContextValue: MoodContextType = {
  currMood: moods.happy,
  setMood: () => {},
};

const MoodContext = createContext<MoodContextType>(defaultContextValue);

export const MoodContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currMood, setCurrentMood] = useState(moods.happy);

  const setMood = (mood: keyof MoodType) => {
    setCurrentMood(moods[mood]);
  };

  return (
    <MoodContext.Provider value={{ currMood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export default MoodContext;
