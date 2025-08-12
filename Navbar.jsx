// src/components/Header.js
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
export default function Navbar(){
  return (
    <header className="nav">
      <div className="container">
        <Link to="/" className="brand">CampStore</Link>
        <nav>
          <NavLink to="/" end>דף הבית</NavLink>
          <NavLink to="/categories">קטגוריות</NavLink>
          <NavLink to="/cart">עגלה</NavLink>
          <NavLink to="/reviews">תגובות</NavLink>
          <NavLink to="/register">הרשמה</NavLink>
          <NavLink to="/login">התחברות</NavLink>
        </nav>
      </div>
    </header>
  )
}
