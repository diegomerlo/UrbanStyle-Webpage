import Navbar from './componentes/Navbar';
import CheckOutPage from './componentes/CheckOutPage';
import Productos from './componentes/Productos';  // Mantén esta importación como componente

function App() {
  return (
    <div className="App" style={{ paddingTop: '70px' }}>
      <nav>
        <Navbar/>
      </nav>
      <div className='productos'>
      <CheckOutPage/>
      </div>
    </div>
  );
}

export default App;
