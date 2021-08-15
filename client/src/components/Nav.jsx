import React from 'react'
import { Link } from "react-router-dom"
import "./Nav.css"

function Nav(props) {
    return (
        <>
        <div className="nav">
            <div className="navLeft">
                <Link to="/">Home</Link>
            </div>
            <div className="navRight">
                <Link to="/login">Login</Link>
            </div>
            <div className="navRight">
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
        <div>{props.children}</div>
        </>
    )
}

export default Nav
