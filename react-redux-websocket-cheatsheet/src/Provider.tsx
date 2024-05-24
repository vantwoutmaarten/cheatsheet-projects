import { ReactNode, createContext, useMemo, useState } from "react";
type ThemeType = "Light" | "Dark";

interface ContextInterface {
  themeColor: ThemeType;
  setThemeColor: (theme: ThemeType) => void;
}

const defaultContext: ContextInterface = {
  themeColor: "Light",
  setThemeColor: () => {
    throw new Error("set theme color must be used within a provider");
  },
};

export const MyContext = createContext(defaultContext);

interface ProviderProps {
  children: ReactNode;
}

export const MyContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<ThemeType>("Light");

  const context = useMemo(
    () => ({
      themeColor: themeColor,
      setThemeColor: setThemeColor,
    }),
    [themeColor]
  );

  return <MyContext.Provider value={context}>{children}</MyContext.Provider>;
};

export default MyContextProvider;
