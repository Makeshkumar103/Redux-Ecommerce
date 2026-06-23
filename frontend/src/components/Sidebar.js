import { Link } from 'react-router-dom';
import { House, PackageCheck, PackagePlus, PackageSearch } from 'lucide-react';



export default function Sidebar() {
     const navItems = [
        { to: "/admin/dashboard", label: "Dashboard", icon: House },
        { to: "/admin/newproduct", label: "+ New Product", icon: PackagePlus },
        { to: "/admin/stock", label: "Stock", icon: PackageSearch },
        { to: "/admin/orders", label: "Expence", icon: PackageCheck },
    ];

    return (
        <nav id="sidebar" className="col-12 col-md-2 p-0" style={{ minWidth: 'auto', maxWidth: 'none' }}>
            <div className="navbar-brand m-4">
                {/* <Link to="/"> */}
                    <img width="150px" src="/images/logo.png" alt="logo-image" />
                {/* </Link> */}
        </div>    
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
    )
}