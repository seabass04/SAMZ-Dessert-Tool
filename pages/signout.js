import React, { useEffect, useState } from 'react';
//import { signInWithGoogle, SignOut } from "../Firebase"
import { provider, auth } from "../Firebase"
import { signInWithPopup, signOut } from 'firebase/auth'
import useRouter from 'next/router'

import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';

function logout(){
    const SignOut = () => {
        signOut(auth)
        .then(() => {
            //console.log("signed out")
            localStorage.clear();
            window.location.href = "/landing";
        })
        .catch((error) => {
        });
    }
    return (
        <div className="googleButton">
            <button onClick={SignOut}> Sign Out </button>
        </div>
    )
}

export default logout;