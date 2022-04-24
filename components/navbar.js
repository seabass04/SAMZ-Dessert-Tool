import React, {Component, useState} from 'react'; 
import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from "../Firebase"
import { onAuthStateChanged } from 'firebase/auth'
import AccountMenu from '../components/accountMenu'
import { GetUser } from '../components/contexts/CurrentUser'

import styles from "../styles/navbar.module.css";
import { SettingsSuggestRounded } from '@mui/icons-material';

/* const authState = async () => {
    //console.log("unknown")
    var name = "hey"
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in.
        console.log("signed in");
        console.log(user.displayName);
        name = user.displayName;
      } 
      else {
        // No user is signed in.
        console.log("signed out");
        name = "Guest";
      }
    });
} */

export default function navbar(){
  //const { currentUser } = GetUser();
    //var user = auth.currentUser.displayName;
    //console.log(user);
    /* var name = " s ";
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        console.log("signed in");
        console.log(user.displayName);
        name = user.displayName;
      } 
      else {
        // No user is signed in.
        console.log("signed out");
        name = "Guest";
      }
    }); */
    //authState();

  return (
    <Navbar sticky="top" variant="dark" className={styles.nav}>
      <Navbar.Brand>UCR Water</Navbar.Brand>

      <Nav className="me-auto">
        <Nav.Link href="landing">Home</Nav.Link>
        <Nav.Link href="samz">SAMZ-Desert Tool</Nav.Link>
        <Nav.Link href="history">History</Nav.Link>
        <Nav.Link href="about">About</Nav.Link>
      </Nav>
      <Nav className="justify-content-end">
          <AccountMenu />
      </Nav>
    </Navbar>
  );
}
