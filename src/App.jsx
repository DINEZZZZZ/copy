import React, { useEffect, useState } from 'react'
import {Navigate, Route,Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './components/Login/Login';
import AdminPage from './components/Admin/AdminPage';
import HighLights from './components/ConsolePro/HighLights';
import Add from './components/Add/Add';
import Update from './components/Update/Update';
import EnquireBox from './components/Enquire/Enquire';


const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/copy/" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );
  const[showLogin,setShowLogin] = useState(false)

  useEffect(() => {
    return () => sessionStorage.removeItem("isAuthenticated");
  }, []);
  
  return (
    <>
  {showLogin?<Login setIsAuthenticated={setIsAuthenticated} setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      
      <Routes>
        <Route path='/copy/' element={<Home setShowLogin={setShowLogin} />}/>
        <Route path='/copy/enquire/:id' element={<EnquireBox/>}/>
        

        <Route
        path="/copy/admin"
        element={
          <ProtectedRoute
            element={<AdminPage setShowLogin={setShowLogin} />}
            isAuthenticated={isAuthenticated}
          />
        }
      />

<Route
        path="/copy/highlights"
        element={
          <ProtectedRoute
            element={<HighLights/>}
            isAuthenticated={isAuthenticated}
          />
        }
      />

<Route
        path="/copy/add"
        element={
          <ProtectedRoute
            element={<Add/>}
            isAuthenticated={isAuthenticated}
          />
        }
      />

<Route
        path="/copy/update/:id"
        element={
          <ProtectedRoute
            element={<Update/>}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      
      </Routes>
    </div>
    </>
  )
}

export default App