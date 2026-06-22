import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);
  if (!token) return <Navigate to="/login" replace />;
  if (!user) return <h2 className="mt-5">Loading...</h2>;
  if (user.role !== 'admin') return <Navigate to="/unauthpage" replace />;
  return children;
}