import React, { Component } from "react";

import SearchField from "./SearchField";
import logo from "../img/imdb-logo.png";
// import ProfilePanel from "./ProfilePanel";
import { NavbarBrand } from 'reactstrap'
import { Link } from "react-router-dom";

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavbarBrand>
                    <Link to="/">
                        <img src={logo} alt="IMDb Logo" />
                    </Link>
                </NavbarBrand>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to={"/"} className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/movie"} className="nav-link">Movie</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/actor"} className="nav-link">Actor/Actress</Link>
                        </li>
                       
                        <li className="nav-item">
                     <Link to={"/addNew"}className="nav-link">Add New Actor
                         
                     
                    </Link>  </li>

                        <li className="nav-item">
                     <Link to={"/createNew"}className="nav-link">Add New Movie
                         
                     
                    </Link> 
                    </li>
                    <li className="nav-item">
                     <Link to={"/createNew"}className="nav-link">Register
                         
                     
                    </Link> 
                    </li>
                 
                    </ul>
                    <SearchField onSearchChanged={this.props.onSearchChanged} />
                    
                    {/* <ProfilePanel
                        username={this.props.username}
                        onLogin={this.props.onLogin}
                    /> */}
                </div>
            </nav>
        );
    }
}

export default NavBar;