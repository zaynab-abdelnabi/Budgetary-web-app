import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { FaUsers, FaTags } from "react-icons/fa";
import { RiArrowUpDownLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import "./Navbar.css";

export default function Navbar(props) {
  const [showNav, setShowNav] = useState(false);
const logout=() =>{
  localStorage.clear();
  window.location.reload(true)
}
  return (
    <div className="navbar">
      <header>
        <div className="header_logo navbar_logo">
          <span className="letter_logo">B</span>
          <span className="name_logo">Budgetary</span>
          <span className="line_logo"></span>
        </div>
        {showNav ? (
          <MdClose onClick={() => setShowNav(false)} />
        ) : (
          <GiHamburgerMenu onClick={() => setShowNav(true)} />
        )}
      </header>

      <div className={showNav ? "sidenav active" : "sidenav"}>
        <ul>
          <li className={props.active === 1 ? "active" : ""}>
            <Link to="/" onClick={() => setShowNav(false)}>
              <BsFillGrid3X3GapFill />
              Home
            </Link>
          </li>
          <li className={props.active === 2 ? "active" : ""}>
            <Link to="/admins" onClick={() => setShowNav(false)}>
              <FaUsers />
              Admins
            </Link>
          </li>
          <li className={props.active === 3 ? "active" : ""}>
            <Link to="/categories" onClick={() => setShowNav(false)}>
              <FaTags />
              categories
            </Link>
          </li>
          <li className={props.active === 4 ? "active" : ""}>
            <Link to="/transactions" onClick={() => setShowNav(false)}>
              <RiArrowUpDownLine />
              Transactions
            </Link>
          </li>
          <li>
            <button className="btn logout-btn"
            onClick={ logout }
            >
              <BiLogOut /> Logout

            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
