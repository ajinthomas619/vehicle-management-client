import React from 'react'

import Navbar from '../components/Navbar'
import VehicleList from '../components/VehicleList'




const Home = () => {
  return (
    <div>
        <Navbar />
        <div>
       <VehicleList/>
        </div>
    </div>
  )
}

export default Home