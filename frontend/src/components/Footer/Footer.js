import React from "react";
// styles 
import './styles/footer.css';

export const Footer = () => {
    return (
        <footer data-testid='footer' className="footer">
            <p>Made with <img className="footer-img" src='/images/heart.png' alt='heart'/> By: <a target='_blank' rel='noreferrer' href="https://tyreeckcodes.com">Tyreeck Makki!</a></p>
        </footer>
    )
}