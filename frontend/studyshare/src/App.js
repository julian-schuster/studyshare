import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import Routes from "./components/Routes";
import Notifier from "./components/Notifier";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7f8f8f",
    },
    secondary: {
      main: "#66cc33",
    },
  },
});

function App() {
  const matchesMd = useMediaQuery("(max-width:768px)");
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          {!matchesMd && <Notifier />}
          <Routes />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
