import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
export default function Header() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return  (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
          <img width="150px" src="/images/logo.png" alt="logo-image" />          
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-5 mt-2 mt-md-0">
       <Search />
      </div>

      <div className="col-12 col-md-2 mt-4 mt-md-0 text-center">
        <Link to='/cart'>
        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </Link>
      </div>

      <div className="col-12 col-md-2 mt-4 mt-md-0 text-center">
        <span id="login" className="ml-3" style={{cursor:'pointer'}} onClick={() => { dispatch(logout()); navigate('/login'); }}>Logout</span>
      </div>
    </nav>
    )
}
