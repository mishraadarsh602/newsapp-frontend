import React, { useState, Component } from 'react'
import { Link } from 'react-router-dom';
import logo from './logo.png';

const NavBar = ({ search,searchFilter, setSearch, submitSearch }) => {
    // const [loggedInUser, setLoggedInUser] = useState();
const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    // console.log("search", search);
}





    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid container-fluid mx-sm-4">
                    <Link className="navbar-brand" to="/"><img style={{ width: "47px" }} src={logo} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      
                        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                            {/* <Link className="nav-link active text-light" aria-current="page" to="/">Welcome to Newstak !! Get Updated news in every 24 hours</Link> */}

                            <li className="nav-item d-flex">
                                <Link className="nav-link active text-light" aria-current="page" to="/signup">Signup</Link>
                                <Link className="nav-link active text-light" aria-current="page" to="/login">Login</Link>

                            </li>


                        </ul>
                        <form className="d-flex searchform" role="search"   onSubmit={submitSearch}>
                            <input className="form-control me-2" required type="search" value={search}  onChange={handleSearch} placeholder="Search" aria-label="Search" />
                                <button className="btn btn-success"  type="submit">Search</button>
                        </form>

                    </div>
                </div>
            </nav>
        </div>
        
    )
}

export default NavBar;
