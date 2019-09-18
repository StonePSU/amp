import React from "react";
import keurigLogo from "../images/keurigLogo.png";
import "./Header.css";
import { Link } from "react-router-dom";

function Header(props) {
  const { logout } = props;
  return (
    <header>
      <nav>
        <Link to="/">
          <img src={keurigLogo} alt="Keurig Logo" />
        </Link>

        {props.isAuthenticated ? (
          <React.Fragment>
            <div className="nav-dropdown">
              <button className="nav-dropdown-button">Accounts</button>
              <div className="nav-dropdown-child">
                <Link to="/accounts?type=Office">Office Accounts</Link>
                <Link to="/accounts?type=KAD">KAD Accounts</Link>
              </div>
            </div>
            <li>
              <button onClick={logout}>Logout {props.isAuthenticated}</button>
            </li>
            <div className="nav-dropdown">
              <i className="fas fa-cog" />
              <div className="nav-dropdown-child">
                <Link to="/my-profile">My Profile</Link>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </React.Fragment>
        )}
      </nav>
    </header>
  );
}

export default Header;
