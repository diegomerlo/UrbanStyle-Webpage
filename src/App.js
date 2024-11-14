import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import SignIn from "./componentes/SignIn";
import SignUp from "./componentes/SignUp";
import CheckOutPage from './componentes/CheckOutPage';
import CheckOut from './componentes/CheckOutForm/CheckOut';
import Productos from './componentes/Productos'; 
import Index from './componentes/indexComponents';
import AadminApp from './admin/AadminApp';
import Home from './admin/Home';
import UserList from './admin/UserList';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import ProductPanel from './admin/ProductPanel';

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
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
      <div className="App" style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/checkout-page' element={<CheckOutPage />} />
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='/inicio' element={<Index />} />
            <Route path='/' element={<Index />} />
            <Route path='/productos' element={<Productos />} />

            {/* Rutas para el panel de administración */}
            <Route path='/admin' element={<AadminApp />}>
              <Route index element={<Home />} /> {/* Ruta por defecto del panel */}
              <Route path='customers' element={<UserList />} /> {/* Ruta para la lista de usuarios */}
              <Route path='productos' element={<ProductPanel />} /> {/* Ruta para la lista de usuarios */}
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
