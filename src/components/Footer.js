import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Avi Grills</h3>
                    <p>Serving happiness, one plate at a time. ❤️</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Cart</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Social</h4>
                    <div className="social-icons">
                        <a
                            href="https://www.instagram.com/ig_avinish01/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>

                        <a
                            href="https://www.instagram.com/ig_avinish01/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Twitter
                        </a>

                        <a
                            href="https://www.instagram.com/ig_avinish01/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Facebook
                        </a>
                    </div>
                </div>

            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Avi Grills. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
