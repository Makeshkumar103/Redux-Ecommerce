import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer theme='dark' position='top-center' />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={
            <PrivateRoute>
              <Header />
              <Home />
              <Footer />
            </PrivateRoute>
          } />
          <Route path='/search' element={
            <PrivateRoute>
              <Header />
              <Home />
              <Footer />
            </PrivateRoute>
          } />
          <Route path='/product/:id' element={
            <PrivateRoute>
              <Header />
              <ProductDetail />
              <Footer />
            </PrivateRoute>
          } />
          <Route path='/cart' element={
            <PrivateRoute>
              <Header />
              <Cart />
              <Footer />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
