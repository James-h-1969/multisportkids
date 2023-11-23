import Camps from './pages/Camps';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './pages/context/cartContext';
import Success from './pages/Success';
import { useState, useEffect } from 'react';
import Manager from './pages/Manager';
import Sports from './pages/Sports';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLogged = sessionStorage.getItem('isLoggedin') === 'True';
    setLoggedIn(isLogged);
    console.log(isLogged);
  }, []);


  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home manageLogged={loggedIn} />} />
          <Route path="/finished" element={<Success />} />
          <Route path="/camps" element={<Camps />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/sports" element={<Sports />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
