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

  const [loggedIn, setLoggedIn] = useState(false);

  function getToManage(yes:boolean){
    if (yes){
      setLoggedIn(true);
    }
  }


  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home manageLogged={loggedIn} setManageLogged={getToManage}/>} />
          <Route path="/finished" element={<Success />} />
          <Route path="/camps" element={<Camps />} />
          <Route path="/private" element={<Private />} />
          {loggedIn ? <Route path="/manager" element={<Manager />} /> : null}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
