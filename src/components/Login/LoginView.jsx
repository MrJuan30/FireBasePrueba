import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, userExist } from '../../firebase/Firebase'
import AuthProvider from '../AuthProvider'


const LoginView = () => {

    const navigate = useNavigate();
    const [CurrentUser, setCurrentUser] = useState(null)
    /*
    state
    0: inicializado
    1: loading
    2: login completo
    3: login pero sin registro
    4: no hay nadie logueado
    5: ya existe el username
    */
    const [State, setCurrentState] = useState(0)

    /*useEffect(() => {
        setCurrentState(1)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExist(user.uid);
                if (isRegistered) {
                    //TODO: redirigir a Dashboard
                    navigate('/dashboard')
                    setCurrentState(2)
                } else {
                    //TODO: redirigir a choose username
                    navigate('/choose-username')
                    setCurrentState(3)
                }

            } else {
                setCurrentState(4)
            }
        })
    }, [navigate])
    */
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

    function handleUserLoggedIn(user) {
        navigate('/dashboard')
    }
    function handleUserNotRegistered(user) {
        navigate('/choose-username')
    }
    function handleUserNotLoggedIn(user) {
        setCurrentState(4)
    }



    if (State === 4) {
        return (
            <div>
                <button onClick={HandleClick}>LOGIN WITH GOOGLE</button>
            </div>
        )
    }



    return (<AuthProvider onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}>
        <div>Loading ...</div>
    </AuthProvider>
    )



}


export default LoginView