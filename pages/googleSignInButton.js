import React from 'react';
import { provider, auth} from "../Firebase"
import { signInWithPopup } from 'firebase/auth'

function googleSignIn(){
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result)=>{
            console.log(result);
            window.location.href = "/landing";
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className="googleButton">
            <button onClick={signInWithGoogle}> Sign In With Google </button>
        </div>
    )
}

export default googleSignIn;