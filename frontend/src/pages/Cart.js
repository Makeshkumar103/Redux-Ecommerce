import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart, clearCart } from "../store/cartSlice";

export default function Cart () {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [complete, setComplete] = useState(false)

    function placeOrderHandler() {
                fetch(process.env.REACT_APP_API_URL+'/order',{
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(cartItems)
                })
                .then((res) => { 
                    if (res.ok) {
                        dispatch(clearCart());
                        setComplete(true);
                    }
                })
    }               
    return (
        cartItems.length > 0 ? <Fragment>
        <div className="container container-fluid">
            <h2 className="mt-5">Your Cart: <b>{cartItems.length}</b></h2>
        
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg -8">
                    {
                        cartItems.map((item) =>
                        (<Fragment key={item.product._id}>
                        <hr />
                        <div className="cart-item">
                            <div className="row">
                                <div className="col-4 col-lg-3">
                                    <img src={item.product.images[0].image} alt={item.product.name} height="90" width="115" />
                                </div>

                                <div className="col-5 col-lg-3">
                                    <Link to={'/product/'+item.product._id}>{item.product.name}</Link>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p id="card_item_price">{item.product.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <div className="stockCounter d-inline">
                                        <span className="btn btn-danger minus" onClick={() => dispatch(decreaseQty(item.product._id))}>-</span>
                                        <input type="number" className="form-control count d-inline" value={item.qty} readOnly />

                                        <span className="btn btn-primary plus" onClick={() => dispatch(increaseQty(item.product._id))}>+</span>
                                    </div>
                                </div>

                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => dispatch(removeFromCart(item.product._id))}></i>
                                </div>
                            </div>
                        </div>
                        <hr />
                         </Fragment>)
                   )}
                    
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc,item) => (acc + item.qty), 0)} (units) </span></p>
                        <p>Est. total: <span className="order-summary-values">{cartItems.reduce((acc,item) => (acc + item.product.price * item.qty), 0)}</span></p>
        
                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={placeOrderHandler}>Place Order</button>
                    </div>
                </div>
            </div>
        </div> 
        </Fragment> : (!complete ? <h2 className="mt-5">Your Cart is Empty</h2> : 
            <>
                <h2 className="mt-5">Order Completed</h2>
                <p>Your Order has been placed!</p>
            </>  )
)}