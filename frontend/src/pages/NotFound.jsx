import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center px-3">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h3 className="mb-3">Page Not Found</h3>
      <p className="text-muted mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/dashboard" className="btn btn-primary px-4">
        <i className="bi bi-house-door me-2"></i>
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
