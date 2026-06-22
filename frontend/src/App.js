import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchProfile } from './store/authSlice';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import UnauthPage from './pages/UnauthPage';
import AdminNewProduct from './pages/AdminNewProduct';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token, user]);

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
          <Route path='/admin/newproduct' element={
            <AdminRoute>
              <Header />
              <AdminNewProduct />
              <Footer />
            </AdminRoute>
          } />
          <Route path='*' element={<NotFound />} />
          <Route path='/unauthpage' element={<UnauthPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
