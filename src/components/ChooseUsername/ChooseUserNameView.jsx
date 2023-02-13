import React, { useEffect, useState } from 'react'
import AuthProvider from '../AuthProvider'
import { useNavigate } from 'react-router-dom'
import { existUsername } from '../../firebase/Firebase';


const ChooseUserNameView = () => {
    const navigate = useNavigate();
    const [State, setState] = useState(0)
    const [CurrentUser, setCurrentUser] = useState({})
    const [Username, setUsername] = useState("")



    function handleUserLoggedIn(user) {
        navigate('/dashboard')
    }
    function handleUserNotRegistered(user) {
        setCurrentUser(user);
        setState(3)
    }
    function handleUserNotLoggedIn(user) {
        navigate('/login')
    }


    function handleInputUserName(e) {
        setUsername(e.target.value)

    }
    async function handleContinue() {
        if (Username !== '') {
            const exists = await existUsername(Username)
            if (exists) {
                setState(5)
            } else {
                const tmp = { ...CurrentUser }
                tmp.processCompleted = true
            }
        }
    }

    if (State === 3) {
        return <div>
            <h1>Bienvenido {CurrentUser.displayName}</h1>
            <p>para finalizar el proceso elige un nombre de usuario</p>
            <div>
                <input type="text" onChange={handleInputUserName}></input>
            </div>
            <div>
                <button onClick={handleContinue}>Continuar</button>
            </div>
        </div>
    }

    return (

        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
        </AuthProvider>
    )
}

export default ChooseUserNameView