import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth } from '../../firebase/Firebase'

const LoginView = () => {
    async function HandleClick() {
        const googleProvider = new GoogleAuthProvider();
        await SignInWithGoogle(googleProvider);
    }

    async function SignInWithGoogle(googleProvider) {
        try {
            const res = await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <button onClick={HandleClick}>LOGIN WITH GOOGLE</button>
        </div>
    )
}

export default LoginView