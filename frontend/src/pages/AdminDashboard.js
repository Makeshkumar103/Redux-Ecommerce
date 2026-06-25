import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import {
  PieChart, Pie, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
  ResponsiveContainer
} from 'recharts';
import Sidebar from '../components/Sidebar';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B', '#6BCB77', '#4D96FF'];

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts('keyword='));
  }, [dispatch]);

  const categoryData = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [products]);

  const stockData = useMemo(() => {
    return products.map((p) => ({ name: p.name, stock: p.stock }));
  }, [products]);

  const priceData = useMemo(() => {
    return products.map((p) => ({ name: p.name, price: p.price }));
  }, [products]);

  const ratingData = useMemo(() => {
    return products.map((p) => ({ name: p.name, rating: p.ratings }));
  }, [products]);

  const sellerData = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      counts[p.seller] = (counts[p.seller] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [products]);

  if (loading) {
    return (
      <div className="sidebar-wrapper">
        <Sidebar />
        <main className="col-12 col-md-10 p-4">Loading...</main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sidebar-wrapper">
        <Sidebar />
        <main className="col-12 col-md-10 p-4">Error: {error}</main>
      </div>
    );
  }

  return (
    <div className="sidebar-wrapper">
      <Sidebar />
      <main className="col-12 col-md-10 p-4">
        <h2>Dashboard</h2>
        <hr />
        <div className="row">
          <div className="col-md-6 mb-4">
            <h5>Total Products by Category</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="col-md-6 mb-4">
            <h5>Stock Availability</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-md-6 mb-4">
            <h5>Product Price Comparison</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-md-6 mb-4">
            <h5>Product Ratings</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="rating" stroke="#FF8042" strokeWidth={2} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="col-md-12 mb-4">
            <h5>Products by Seller</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={sellerData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {sellerData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
