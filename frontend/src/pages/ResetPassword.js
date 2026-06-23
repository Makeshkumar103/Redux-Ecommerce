import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { resetPassword, clearError } from '../store/authSlice';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { token: authToken, user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authToken && user) {
      navigate('/');
    }
  }, [authToken, user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    setLocalError('');
    dispatch(resetPassword({ token, password }));
  };

  return (
    <div className="wrapper">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Reset Password</h2>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
          </div>
          <button type="submit" className="btn w-100" disabled={status === 'loading'}>
            {status === 'loading' ? 'Resetting...' : 'Reset Password'}
          </button>
          {(error || localError) && <div className="alert alert-danger mt-3 py-2">{localError || error}</div>}
          <p className="text-center mt-3 mb-0">
            <Link to="/login">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
