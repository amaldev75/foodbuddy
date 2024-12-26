import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'

export default function Navbar({data}) {
  return (
    <>
    <div className="navbar">
      {/* <Link to="/">Home</Link> */}
      <h1>FoodBuddy</h1>

      <Link to="/login">Login</Link>
      
      {/* <Link to='card'>card</Link> */}
    </div>
    <Card data={data}/>
    </>
  )
}
