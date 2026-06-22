import { Link } from 'react-router-dom';

function UnauthPage(){
    return ( 
        <div className="container text-center mt-5">
            <h1 className="display-3 text-muted">Access Denied</h1>
            <h2 className="mb-4">You don&apos;t have access to view this page.</h2>
            <p className="lead text-muted mb-4">Please log in with an authorized account.</p>
            <Link to="/login" className="btn btn-orange me-3">Login</Link>
            <Link to="/" className="btn btn-outline-secondary">Back to Home</Link>
        </div>
    );
}

export default UnauthPage;