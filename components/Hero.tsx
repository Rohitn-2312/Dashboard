import React from 'react'
import Navbar from './Navbar/Navbar' 
import Dashboard from './Dashboard/Dashboard'
import CardList from './CardList/CardList'

const Hero = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <CardList />
    </div>
  )
}

export default Hero
