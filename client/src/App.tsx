import Camps from './pages/Camps';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Private from './pages/Private';
// import Development from './pages/Development';
import Merch from './pages/Merch';
import Contact from './pages/Contact';
import { CartProvider } from './pages/context/cartContext';
// import Checkout from './pages/Components/Checkout';
import Success from './pages/Success';
import { useState, useEffect } from 'react';
import Manager from './pages/Manager';


function App() {

  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const isLogged = sessionStorage.getItem('isLoggedin') === 'True';
    setLoggedIn(isLogged);
  }, []);


  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home manageLogged={loggedIn} />} />
          <Route path="/finished" element={<Success />} />
          <Route path="/camps" element={<Camps />} />
          <Route path="/private" element={<Private />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
