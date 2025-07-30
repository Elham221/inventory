import React from "react";
import CreateCustomer from "./components/CustomerRegistration/CreateCustomer";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "./common/theme";
import Header from "./common/Header";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
     
<ThemeProvider theme={theme}>
  <CssBaseline />
  <CreateCustomer />
</ThemeProvider>

    </ColorModeContext.Provider>
  );
};

export default App;
