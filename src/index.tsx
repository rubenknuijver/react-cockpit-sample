import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider, ThemeOptions } from "@material-ui/core";

import blue from "@material-ui/core/colors/blue";
import lime from "@material-ui/core/colors/lime";
import blueGrey from "@material-ui/core/colors/blueGrey";

import App from "./app/App";
import GlobalStateProvider from "./components/GlobalStateProvider";

const themeObject: ThemeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: blueGrey["500"] //"#1e88e5"
    },
    secondary: {
      main: "#c6ff00"
    }
  }
};

const rootElement = document.getElementById("root");

// const switchTheme = (themeType: string) => {
//   const {
//     palette: { type }
//   } = themeObject;

//   if(type !== themeType ){
//     themeObject.palette.type = themeType;
//   }
// };

const theme = createMuiTheme(themeObject);
render(
  <React.StrictMode>
    <GlobalStateProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="cockpit">
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </GlobalStateProvider>
  </React.StrictMode>,
  rootElement
);
