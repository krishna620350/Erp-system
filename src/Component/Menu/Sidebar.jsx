import { Link } from 'react-router-dom';

const SideBar = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid d-flex flex-column min-vh-88">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex flex-column">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Features</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Pricing</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
                            </li>
                            </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export { SideBar };