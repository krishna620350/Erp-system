import { Link } from 'react-router-dom'


const Navbar = ({theme}) => {

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid d-flex justify-content-between">
                    <Link className="navbar-brand" to="/">ERP#</Link>
                    <form className="d-flex w-50" role="search">
                        <input className="form-control border-none" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    <div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item me-5">
                                    <button className="btn btn-success" aria-current="page"><i class="fa-solid fa-user-plus"></i> New</button>
                                </li>
                                <li className="nav-item">
                                    <div class="form-check form-switch nav-link" aria-current="page">
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={theme.handleThemeChange} />
                                        <label class="form-check-label" for="flexSwitchCheckChecked">{theme.darkMode === "light" ? "Light" : "Dark"}</label>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page"><i className="fa-solid fa-bell"></i></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link"><i className="fa-solid fa-envelope"></i></Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-user"></i>
                                    </Link>
                                    <button className="dropdown-menu dropdown-menu-lg-end btn btn-danger ps-3"><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}

export { Navbar };