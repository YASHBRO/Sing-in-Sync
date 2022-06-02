import React from "react";
import { render } from "react-dom";
import Router from "./Router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/Pallette";
import { CssBaseline } from "@mui/material";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router />
        </ThemeProvider>
    );
}

export default App;

const appDiv = document.getElementById("app");

render(<App />, appDiv);
