// Import necessary dependencies
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeProvider";

// Custom hook to consume theme context
const useTheme = () => {
  // Retrieve theme context
  const context = useContext(ThemeContext);

  // Return mode and setMode functions from context
  return context;
};

export default useTheme;
