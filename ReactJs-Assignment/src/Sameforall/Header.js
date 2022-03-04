import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import profile from "../Sameforall/profilepic.png";

document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        
        nav.classList.toggle("show");
        
        toggle.classList.toggle("bx-x");
        
        bodypd.classList.toggle("body-pd");
        
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header");

  
  const linkColor = document.querySelectorAll(".nav_link");

  function colorLink() {
    if (linkColor) {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }
  }
  linkColor.forEach((l) => l.addEventListener("click", colorLink));

  
});
const Header = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { user } = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : "";
  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };
  return (
    <>
      <div id="body-pd">
        <header className="header" id="header">
          <div className="header_toggle">
            <i className="bx bx-menu" id="header-toggle"></i>
          </div>
          <div className="header_img">
            <img src={profile} alt="" />
          </div>
        </header>
        <div className="l-navbar" id="nav-bar">
          <nav className="nav">
            <div>
              <Link className="nav_logo" to="/">
                <i className="bx bx-layer nav_logo-icon"></i>
                <span className="nav_logo-name">ShopNow</span>
              </Link>
              <div className="nav_list">
                <Link className="nav_link active" title="User" to="/">
                  <i className="bx bx-user nav_icon"></i>
                  <span className="nav_name">{user?.email?.split("@")[0]}</span>
                </Link>

                <Link className="nav_link" to="/orders" title="Orders">
                  <i className="bx bx-spreadsheet nav_icon"></i>
                  <span className="nav_name">Orders</span>
                </Link>
                <div>
                  {localStorage.getItem("currentUser") ? (
                    <Link className="nav_link" to="/" onClick={logout} title='Logout'>
                      <i className="bx bx-log-out nav_icon"></i>
                      <span className="nav_name">Logout</span>
                    </Link>
                  ) : (
                    <Link className="nav_link" to="/login" title='Login'>
                      <i className="bx bx-log-in nav_icon"></i>
                      <span className="nav_name">Login</span>
                    </Link>
                  )}
                </div>

                <Link className="nav_link" to="/cart" title="Cart">
                  <i className="bx bx-cart nav_icon"><span className='ms-1'>{cartItems.length}</span></i>
                  <span className="nav_name"> Cart </span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
