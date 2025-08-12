// App.js
// src/App.js
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Register from './pages/Register'
import LoginOTP from './pages/LoginOTP'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Reviews from './pages/Reviews'
import Checkout from './pages/Checkout'
import { CartProvider } from './context/CartContext'

export default function App(){
  return (
    <CartProvider>
      <div className="app">
        <Navbar/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/categories" element={<Categories/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<LoginOTP/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/product/:id" element={<Product/>} />
            <Route path="/reviews" element={<Reviews/>} />
            <Route path="/checkout" element={<Checkout/>} />
          </Routes>
        </main>
        <WhatsAppButton/>
        <Footer/>
      </div>
    </CartProvider>
  )
}
