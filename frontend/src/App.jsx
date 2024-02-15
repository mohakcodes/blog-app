import React from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import PostDetails from './pages/PostDetails.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { UserContextProvider } from './context/Usercontext.jsx'

const App = () => {
  return (
    <UserContextProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/posts/post/:id' element={<PostDetails/>}/>
        <Route path='/write' element={<CreatePost/>}/>
        <Route path='/edit/:id' element={<EditPost/>}/>
        <Route path='/profile/:id' element={<ProfilePage/>}/>
      </Routes>
      <Footer/>
    </UserContextProvider>
  )
}

export default App