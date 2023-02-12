import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, userExist } from '../../firebase/Firebase'

const LoginView = () => {

    const [CurrentUser, setCurrentUser] = useState(null)
    /*
    state
    0: inicializado
    1: loading
    2: login completo
    3: login pero sin registro
    4: no hay nadie logueado
    */
    const [State, setCurrentState] = useState(0)

    useEffect(() => {
        setCurrentState(1)
        onAuthStateChanged(auth, HandleUserStateChange)
    }, [])

    async function HandleUserStateChange(user) {
        if (user) {
            const isRegistered = await userExist(user.uid);
            if (isRegistered) {
                setCurrentState(2)
            } else {
                setCurrentState(3)
            }

        } else {
            setCurrentState(4)
        }
    }

    async function HandleClick() {
        const googleProvider = new GoogleAuthProvider();
        await SignInWithGoogle(googleProvider);


        async function SignInWithGoogle(googleProvider) {
            try {
                const res = await signInWithPopup(auth, googleProvider)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
    }


    if (State === 2) {
        return <div>AUTENTICADO Y REGISTRADO</div>
    }

    if (State === 3) {
        return <div>AUTENTICADO PERO NO REGISTRADO</div>
    }
    if (State === 4) {
        return (
            <div>
                <button onClick={HandleClick}>LOGIN WITH GOOGLE</button>
            </div>
        )
    }

    return (
        <div>Loading ...</div>
    )

}


export default LoginView