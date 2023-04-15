import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import PrivateComponent from './components/PrivateComponent';

import AddProduct from './pages/productsRelated/AddProduct';
import Product from './pages/productsRelated/Product';
import UpdateProduct from './pages/productsRelated/UpdateProduct';
import Profile from './pages/userDetails/Profile';
import SignUp from './pages/userDetails/SignUp';
import UpdateLogout from './pages/userDetails/UpdateLogout';
import Login from './pages/userDetails/Login';
import Logout from './pages/userDetails/Logout';

import Footer from './components/Footer';
import "./App.css"

const App = () => {

  const signed = localStorage.getItem("user")
  const [loggedIn, setLoggedIn] = useState(signed !== null)
  const user = JSON.parse(signed)

  return (
    <div>
      <BrowserRouter>
        <Nav loggedIn={loggedIn} />
        <Routes>

          <Route element={<PrivateComponent signed={signed} />} >
            <Route path="/" element={<Product user={user} />} />
            <Route path="/add" element={<AddProduct user={user} />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} user={user} />} />
            <Route path="/updatelogout" element={<UpdateLogout setLoggedIn={setLoggedIn} />} />
          </Route>

          <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} signed={signed} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} signed={signed} />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App