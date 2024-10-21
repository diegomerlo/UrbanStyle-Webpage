import Navbar from './componentes/Navbar';
import CheckOutPage from './componentes/CheckOutPage';
import CheckoutCard from './componentes/CheckOutCard';
import Productos from './componentes/Productos';  // Mantén esta importación como componente
import  SingIn  from "./componentes/SingIn";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App" style={{ paddingTop: '70px' }}>
        <Navbar />
        <Routes>
        <Route path='/SingIn' element={<SingIn />}>
        </Route>
          <Route path='/checkout-page' element={<CheckOutPage />}>
          </Route>
          <Route path='/' element={<Productos />} >
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
