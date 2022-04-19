import React from "react";
// components 
import { Nav } from "../../components/Nav/Nav";
import { Footer } from "../../components/Footer/Footer";
import { Form2 } from "../../components/SearchForm/Form2";
// styles
import './styles/allArticles.css';

export const AllArticles = () => {
    return (
        <div>
            <Nav />
            <div className="search-results-container">
                <Form2 />
            </div>
            <Footer />
        </div>
    )
}