import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faTimes, faChartBar, faHome, faUserFriends, faCog } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className='navbar flex justify-between items-center px-4 py-2'>
      <span className='text-xl font-bold text-red-500'>LOGO</span>
      <ul className="hidden sm:flex list-none gap-4">
        <li onClick={() => setMenu('home')} className={`cursor-pointer ${menu === 'home' ? 'border-b-2 border-red-500' : ''}`}>home</li>
        <li onClick={() => setMenu('products')} className={`cursor-pointer ${menu === 'products' ? 'border-b-2 border-red-500' : ''}`}>products</li>
        <li onClick={() => setMenu('services')} className={`cursor-pointer ${menu === 'services' ? 'border-b-2 border-red-500' : ''}`}>services</li>
        <li onClick={() => setMenu('contact us')} className={`cursor-pointer ${menu === 'contact us' ? 'border-b-2 border-red-500' : ''}`}>contact us</li>
      </ul>
      <div className="flex items-center gap-4">
        <FontAwesomeIcon className='text-xl cursor-pointer' onClick={() => setShowLogin(true)} icon={faUser} />
        <FontAwesomeIcon className={`text-xl cursor-pointer block sm:hidden ${!sidebarOpen ? 'block' : 'hidden'}`} icon={faBars} onClick={toggleSidebar} />
      </div>
      {sidebarOpen && (
        <div className="sidebar bg-transparent fixed top-0 bottom-0 left-0 w-1/2 shadow-lg z-10">
          <FontAwesomeIcon className='text-xl cursor-pointer absolute top-4 right-4' icon={faTimes} onClick={closeSidebar} />
          <ul className="sidebar-menu py-10 px-4 bg-gray-100 rounded-lg">
  <li className="text-gray-800 font-semibold mb-4 py-2 px-4 hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg cursor-pointer">
    <FontAwesomeIcon icon={faHome} className="mr-2" />
    Home
  </li>
  <li className="text-gray-800 font-semibold mb-4 py-2 px-4 hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg cursor-pointer">
    <FontAwesomeIcon icon={faChartBar} className="mr-2" />
    Products
  </li>
  <li className="text-gray-800 font-semibold mb-4 py-2 px-4 hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg cursor-pointer">
    <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
    Service
  </li>
  <li className="text-gray-800 font-semibold mb-4 py-2 px-4 hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg cursor-pointer">
    <FontAwesomeIcon icon={faCog} className="mr-2" />
    Contact us
  </li>
</ul>


        </div>
      )}
    </div>
  );
}

export default Navbar;
