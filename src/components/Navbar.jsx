import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-kamar-tamu.png'; 

const Navbar = () => (
  <nav
    className="navbar navbar-expand-lg navbar-light bg-lightblue"
    style={{
      paddingTop: '1px',
      paddingBottom: '1px',
      minHeight: '40px',
    }}
  >
    <div
      className="container"
      style={{ alignItems: 'center', padding: '0', minHeight: '40px' }}
    >
      <Link
        className="navbar-brand fw-bold"
        to="/"
        style={{ padding: 0, margin: 0 }}
      >
        <img src={logo} alt="Logo" style={{ height: '75px' }} />
      </Link>
      <div
        className="collapse navbar-collapse justify-content-center"
        style={{ minHeight: '40px' }}
      >
        <ul
          className="navbar-nav mb-0 gap-5"
          style={{
            alignItems: 'center',
            lineHeight: '1',
            fontSize: '15px',
          }}
        >
          <li className="nav-item">
            <Link className="nav-link fw-bold p-0" to="/">
              HOME
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold p-0" to="/about">
              ABOUT US
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold p-0" to="/our-villa">
              OUR VILLA
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold p-0" to="/faq">
              FAQ
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold p-0" to="/contact">
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
      <div className="login">
        <Link
          to="/login"
          className="nav-link fw-bold p-0"
          style={{ fontSize: '14px' }}
        >
          LOGIN
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
