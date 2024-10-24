import Navbar from './componentes/Navbar';
import CheckOutPage from './componentes/CheckOutPage';
import CheckoutCard from './componentes/CheckOutCard';
import Productos from './componentes/Productos'; 
import SignIn from "./componentes/SignIn";
import SignUp from "./componentes/SignUp";
import Footer from './componentes/Footer'; // O el componente correcto que necesitas
// import Footer from './CheckOutForm/CheckOut'; // Eliminar esta línea si no es necesaria
import CheckOut from './componentes/CheckOutForm/CheckOut'; // O el componente correcto que necesitas

import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import Index from './componentes/indexComponents';

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App" style={{  }}>
        <Navbar />
        <Routes>
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/checkout-page' element={<CheckOutPage />} />
          <Route path='/checkout' element={<CheckOut/>} />
          <Route path='/inicio' element={<Index/>}/>
          <Route path='/' element={<Index/>}/>
          <Route path='/productos' element={<Productos />} />
        </Routes>
        <Footer /> {/* Agrega el Footer aquí */}
      </div>
    </Router>
  );
}
export default App;
