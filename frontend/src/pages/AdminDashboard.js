import { Link } from 'react-router-dom'
import { House, PackageCheck, PackagePlus, PackageSearch } from 'lucide-react';

export default function AdminDashboard() {
    const navItems = [
        { to: "/admin/", label: "Dashboard", icon: House },
        { to: "/admin/newproduct", label: "+ New Product", icon: PackagePlus },
        { to: "/admin/stock", label: "Stock", icon: PackageSearch },
        { to: "/admin/orders", label: "Expence", icon: PackageCheck },
    ];

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar" className="col-12 col-md-2 p-0" style={{ minWidth: 'auto', maxWidth: 'none' }}>
                <ul className="list-unstyled components p-3">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <li key={to}>
                            <Link to={to} className="d-flex align-items-center py-2 px-3" style={{ color: '#febd69', fontWeight: 'bold', textDecoration: 'none', borderRadius: '0.3rem' }}>
                                <Icon size={20} className="me-2" />
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <main className="col-12 col-md-10 p-4">
                <h2>Dashboard</h2>
                <hr />
                <p>Overview content goes here.</p>
            </main>
        </div>
    )
}