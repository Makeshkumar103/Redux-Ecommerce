import { Link } from "react-router-dom";

export default function ProductCard ( {product} ) {

    const imgSrc = product?.images?.[0]?.image || "/images/no-image-placeholder.png";
    // console.log(product.images[0].image)
    const handleImageError = (e) => {
        e.target.src = "/images/no-image-placeholder.png";
    }

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                <div className="card p-3 rounded">
                    <img
                        className="card-img-top mx-auto"
                        src={imgSrc}
                        alt="product-image"
                        onError={handleImageError}
                        />  
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                            {/* <a href="*">OPPO F21s Pro 5G (Dawnlight Gold, 8GB RAM, 128 Storage) with No Cost EMI/Additional Exchange Offers</a> */}
                            {/* <a href="*">{product.name}</a> */}
                            <Link to={`/product/${product._id}`}> {product.name}</Link>

                        </h5>
                        <p> {product.description}</p>

                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{width : `${product.ratings/5 *100}%`}}></div>
                        </div>
                    </div>
                    <p className="card-text">{product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                    </div>
                </div>
            </div>

    );
}