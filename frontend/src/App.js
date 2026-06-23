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
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import UnauthPage from './pages/UnauthPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminNewProduct from './pages/AdminNewProduct';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname.startsWith('/forgot-password') || window.location.pathname.startsWith('/reset-password');
    if (token && !user && !isAuthPage) {
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
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
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
           <Route path='/admin/dashboard' element={
            <AdminRoute>
              <Header />
              <AdminDashboard />
              <Footer />
            </AdminRoute>
          } />
          <Route path='/admin/newproduct' element={
            <AdminRoute>
              <Header />
              <AdminNewProduct />
              <Footer />
            </AdminRoute>
          } />
          {/* <Route path='/admin/stock' element={
            <AdminRoute>
              <Header />
              <AdminStock />
              <Footer />
            </AdminRoute>
          } />
          <Route path='/admin/expenses' element={
            <AdminRoute>
              <Header />
              <AdminExpenses />
              <Footer />
            </AdminRoute>
          } /> */}
          <Route path='*' element={<NotFound />} />
          <Route path='/unauthpage' element={<UnauthPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
