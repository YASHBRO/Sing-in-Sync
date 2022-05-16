import { createTheme } from "@mui/material/styles";
import {
    blue,
    lightBlue,
    lightGreen,
    red,
    teal,
    yellow,
} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: blue["A400"],
        },
        secondary: {
            main: teal[400],
        },
        error: {
            main: red[500],
        },
        warning: {
            main: yellow["A200"],
        },
        info: {
            main: lightBlue[200],
        },
        success: {
            main: lightGreen[600],
        },
    },
});

export default theme;
