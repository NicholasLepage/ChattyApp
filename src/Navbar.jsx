import React, { Component } from "react";

const Navbar = props => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        Chatty
      </a>
      <img src="./src/docs/chickin.png" className="line-art" />
      <div className="navbar-users">{props.onlineUsers} online users </div>
    </nav>
  );
};

export default Navbar;
