import React from 'react'
import {Link} from 'react-router-dom';
import '../css/Header.css';

function Header() {
    return (
        <div className="Appheader">
            <h1><Link className="Title" to="/">ParkAway</Link></h1>
            <div className="HeaderRight">
                <h2 className="Links">
                    <Link to="/about-us">About Us</Link> &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/contact">Contact</Link> &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/services">Services</Link>
                </h2>
            </div>
            <div className="Sign-in">
                <h2 className="Sign-in-button">Sign In</h2>
                <h3><Link to="/create-account">Create an Account</Link></h3>
            </div>
            
        </div>
    )
}

export default Header;