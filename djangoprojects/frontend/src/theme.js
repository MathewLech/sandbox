import { createMuiTheme } from '@material-ui/core/styles/';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';



export default createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: grey, 
    textcolor: blueGrey[50],
    lightgrey: grey[500]
  },
  typography: {
    useNextVariants: true,
    
  },
});