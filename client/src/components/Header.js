import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ type }) => {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <h2 onClick={() => navigate("/")}>Todo App</h2>
            {type != "login" && <>
                <div className="links">
                    <Link to="/"> Home Page</Link>
                    <Link to="/createitem"> Create An Item</Link>
                    <Link className='logout' to="/login"> Logout</Link>
                </div>
            </>
            }
        </div>
    )
}

export default Header