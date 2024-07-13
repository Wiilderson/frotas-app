import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/header/header';
import Home from './pages/home';
import Motorista from './pages/motoristas';
import Caminhoes from './pages/caminhoes';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="App">
          <Header />
          <main className="p-4">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/motoristas" element={<Motorista />} />
              <Route path="/caminhoes" element={<Caminhoes />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
