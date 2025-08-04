import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "./common/theme";
import Header from "./common/Header";
import CustomerRegistrationTabs from "./components/CustomerRegistrationTabs"; // <- FIXED: Correct import

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Optional: Add header if you're using it */}
        {/* <Header /> */}

        {/* Use tab-based customer registration UI */}
        <CustomerRegistrationTabs />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
