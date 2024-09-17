import Producto from './componentes/Producto';
import './App.css';
import Navbar from './componentes/Navbar';

function App() {
  return (
    <div className="App">
      <nav>
        <Navbar/>
      </nav>
      <div className='productos'>
        <Producto/>
      </div>
    </div>
  );
}

export default App;
