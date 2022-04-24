import React, {Component} from 'react'; 
//import styles from '../styles/footer.module.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
export default function Footer() {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);
  
    return (
      <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            style={{ background: "#181C1D" }}
          >
            <BottomNavigationAction style={{color: "#BBE1FA"}} label="Made with 💙 by the dev team"/>
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }
