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


function App() {

  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/finished" element={<Success />} />
          <Route path="/camps" element={<Camps />} />
          <Route path="/private" element={<Private />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
