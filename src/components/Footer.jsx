import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const aboutLinks = [
    { name: "About", path: "/about" },
    { name: "Villa", path: "/our-villa" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  const resourceLinks = [
    { name: "Help", path: "/help" },
    { name: "Terms", path: "/terms" },
    { name: "Privacy", path: "/privacy" },
  ];

  return (
    <footer className="text-md-start">
      <div className="row">
        <div className="col-md-4 mb-4 text-center">
          <h5>LOGO</h5>
          <p>Your trusted partner for luxury stays in Bali's best villas.</p>
          <div className="footer-social">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <h5>About</h5>
          {aboutLinks.map((link, idx) => (
            <p key={idx}>
              <Link to={link.path}>{link.name}</Link>
            </p>
          ))}
        </div>
        <div className="col-md-4 text-center">
          <h5>Resources</h5>
          {resourceLinks.map((link, idx) => (
            <p key={idx}>
              <Link to={link.path}>{link.name}</Link>
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
