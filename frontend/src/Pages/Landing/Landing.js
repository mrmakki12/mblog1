import React from "react";
// components 
import { Footer } from '../../components/Footer/Footer';
import { Form1 } from "../../components/LoginRegForm/Form1";
import { Logo } from '../../components/Logo/Logo';
// styles
import './styles/landing.css';

export const Landing = () => {
    return (
        <div className="landing-container">
            <div className="logo-form1">
                <Logo />
                <Form1 />
            </div>
            {/* temporary for testing footer is constant */}
            <Footer />
        </div>
    )
}
