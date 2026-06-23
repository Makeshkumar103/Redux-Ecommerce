import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../store/authSlice';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && user) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/');
    }
  }, [token, user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ name: username, password }));
  };

  return (
    <div className="wrapper">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login</h2>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn w-100" disabled={status === 'loading'}>
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="alert alert-danger mt-3 py-2">{error}</div>}
          <p className="text-center mt-3 mb-0">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
          <p className="text-center mt-2 mb-0">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
