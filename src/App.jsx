import { Link } from "react-router-dom";

const App = () => {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center">
            <h2>Welcome! Please choose an option:</h2>
            <button className="btn btn-primary m-2">Login</button>
            <Link to="/signup" className="btn btn-secondary m-2">
                Signup
            </Link>
            </div>
        </div>
    );
}

export { App };