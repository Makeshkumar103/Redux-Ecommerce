import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../store/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
