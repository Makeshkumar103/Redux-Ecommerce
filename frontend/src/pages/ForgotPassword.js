import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../store/authSlice';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email)).then((res) => {
      if (res.payload?.resetToken) {
        setResetToken(res.payload.resetToken);
      }
    });
  };

  return (
    <div className="wrapper">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Forgot Password</h2>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="btn w-100" disabled={status === 'loading'}>
            {status === 'loading' ? 'Generating...' : 'Generate Reset Link'}
          </button>
          {error && <div className="alert alert-danger mt-3 py-2">{error}</div>}
          {resetToken && (
            <div className="alert alert-success mt-3 py-2">
              Use this link to reset your password:<br />
              <Link to={`/reset-password/${resetToken}`} className="mt-2 d-inline-block">
                Reset Password
              </Link>
            </div>
          )}
          <p className="text-center mt-3 mb-0">
            <Link to="/login">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
