import Navbar from './componentes/Navbar';
import CheckOutPage from './componentes/CheckOutPage';
import CheckoutCard from './componentes/CheckOutCard';
import Productos from './componentes/Productos';  // Mantén esta importación como componente
import SignIn from "./componentes/SignIn";  // Corrige el nombre a SignIn
import SignUp from "./componentes/SignUp";  // Corrige el nombre a SignUp

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App" style={{ paddingTop: '70px' }}>
        <Navbar />
        <Routes>
          <Route path='/SignIn' element={<SignIn />} /> {/* Corrige el nombre */}
          <Route path='/SignUp' element={<SignUp />} /> {/* Corrige el nombre */}
          <Route path='/checkout-page' element={<CheckOutPage />} />
          <Route path='/' element={<Productos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
