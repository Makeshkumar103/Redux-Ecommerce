import { Link } from 'react-router-dom';

function NotFound(){
    return ( 
        <div className="container text-center mt-5">
            <h1 className="display-1 fw-bold text-muted">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="lead text-muted mb-4">The page you&apos;re looking for doesn&apos;t exist.</p>
            <Link to="/" className="btn btn-orange">Back to Home</Link>
        </div>
    );
}

export default NotFound;