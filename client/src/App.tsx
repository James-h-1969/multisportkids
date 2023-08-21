import './App.css';
import Camps from './pages/Camps';
import Home from './pages/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import Private from './pages/Private';
import Development from './pages/Development';
import Merch from './pages/Merch';
import Contact from './pages/Contact';
import { CartProvider } from './pages/context/cartContext';
import Checkout from './pages/Components/Checkout';
import Success from './pages/Success';
import Management from './Management';
import { useState, useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  manageLogged: boolean;
}

function App() {
  const [manageLogged, setManageLogged] = useState(false);

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ( manageLogged, { children}) => {
    if (!manageLogged) {
      return <Navigate to="/" replace />;
    } else {
      return <>{children}</>;
    }
  };

  useEffect(() => {
    console.log(manageLogged);
  }, [manageLogged])



  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camps" element={<Camps />} />
          <Route path="/private" element={<Private />} />
          <Route path="/development" element={<Development />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/manage" element={<ProtectedRoute manageLogged={manageLogged}><Management /></ProtectedRoute>} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
