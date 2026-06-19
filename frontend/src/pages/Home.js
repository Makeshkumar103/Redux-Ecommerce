import { Fragment } from "react/jsx-runtime";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";

export default function Home() {

    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        dispatch(fetchProducts(searchParams));
    }, [dispatch, searchParams]);

    if (loading) {
        return <h2 className="mt-5">Loading...</h2>;
    }

    return <Fragment>
      <h1 id="products_heading">Latest Products</h1>
    
        <section id="products" className="container mt-5">
        <div className="row">
            {products.map(product =>
                <ProductCard 
                    product={product} 
                    key={product._id}
            />)}
        </div>
        </section>
    </Fragment>
}