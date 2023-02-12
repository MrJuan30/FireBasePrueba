import { Route, Routes } from 'react-router-dom'
import './App.css'
import ChooseUserNameView from './components/ChooseUsername/ChooseUserNameView'
import DashBoardView from './components/Dashboard/DashBoardView'
import EditProfileView from './components/EditProfile/EditProfileView'
import Home from './components/Home/Home'
import LoginView from './components/Login/LoginView'
import PublicProfileView from './components/PublicProfileView/PublicProfileView'
import SignOutView from './components/SignOut/SignOutView'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginView />} />
        <Route path="dashboard" element={<DashBoardView />} />
        <Route path="dashboard/profile" element={<EditProfileView />} />
        <Route path="signout" element={<SignOutView />} />
        <Route path="u/:username" element={<PublicProfileView />} />
        <Route path="choose-username" element={<ChooseUserNameView />} />
      </Routes>
    </>
  )
}

export default App
