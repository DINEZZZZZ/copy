import React, { useState } from 'react'
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Products from '../../components/ProductDisplay/Products';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Mail from '../../components/Mail/Mail';


const Home = ({setShowLogin}) => {
    const[category,setCategory]=useState("Top products")
  return (
    
    <div>
        <Navbar setShowLogin={setShowLogin} />
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <Products/>
        <hr />
        <Mail/>
        <Footer/>
    </div>
  )
}

export default Home