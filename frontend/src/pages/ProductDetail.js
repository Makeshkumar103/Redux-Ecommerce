import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProductDetails } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";


export default function ProductDetials() {

    const dispatch = useDispatch();
    const { product, loading } = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.items);
    const [qty, setQty] = useState(1);
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id]);

    function addToCartHandler() {
        const itemExist = cartItems.find((item) => item.product._id === product._id)
        if (!itemExist) {
            dispatch(addToCart({ product, qty }));
            toast("Cart Item added successfully!")
        } 
    }

    function increaseQty () {
        if (product.stock === qty){
            return;
        }
        setQty((state) => state + 1 );
    }
    
    function decreaseQty () {
        if (qty > 0) {
            setQty((state) => state - 1 );    
        }
    }

    if (loading || !product) {
        return <h2 className="mt-5">Loading...</h2>;
    }

return (
    <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={product.images[0].image} alt="sdf" height="500" width="500" />
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.description}</h3>
                <p id="product_id">{product._id}</p>
                <hr />

                <div className="rating-outer">
                    <div className="rating-inner" style={{width : `${product.ratings/5 *100}%`}}></div>
                </div>
                <hr />

                <p id="product_price">{product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                    <input type="number" className="form-control count d-inline" value={qty} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>

                <button type="button" onClick={addToCartHandler} disabled={product.stock === 0 } id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>
                <hr />

                        <p>Status: <span id="stock_status" className={product.stock > 0  ? 'text-success' : 'text-danger'}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>
                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
				
                <div className="rating w-50"></div>
						
            </div>

        </div>

    </div>
)
}