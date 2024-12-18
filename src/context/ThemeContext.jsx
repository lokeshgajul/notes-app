import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // const toggleTheme = () => {
  //   if (theme == "light") {
  //     document.body.style.backgroundColor = "#1f1f1f";
  //     setTheme("dark");
  //     console.log("dark");
  //   } else {
  //     document.body.style.backgroundColor = "blue";
  //     console.log("light");
  //     setTheme("light");
  //   }
  // };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Dynamically update body background
    document.body.style.backgroundColor =
      newTheme === "dark" ? "#1f1f1f" : "blue";
  };

  useEffect(() => {
    console.log("Current Theme:", theme); // Logs whenever the theme changes
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
