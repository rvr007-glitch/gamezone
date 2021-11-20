import React, { useState, useEffect } from 'react'
import { facebookProvider, googleProvider } from './config/Authmethod'
import socialMediaAuth from './services/auth'
import firebase from 'firebase'
import app from './config/firebase-config'
import "./home.css"

const Home = () => {
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            console.log(user.displayName);
        })

    })

    const handleOnClick = async (provider) => {
        const res = await socialMediaAuth(provider)

        console.log(res);
    }


    return (
        <div>
            {currentUser && <>
                <img src={currentUser.photoURL} width="100" height="100"></img>
                <p >{currentUser.displayName}
                </p>
                <p >{currentUser.email}
                </p>
            </>}
            <button onClick={() => handleOnClick(googleProvider)}>Google</button>
        </div>
    )
}

export default Home
