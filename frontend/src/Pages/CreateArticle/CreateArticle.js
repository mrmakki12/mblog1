import React from "react";
// components 
import { Nav } from '../../components/Nav/Nav';
import { Footer } from "../../components/Footer/Footer";
import { Form3 } from '../../components/ArticleForm/Form3';
// api
import mBlog from "../../API/mBlog";
// styles
import './styles/createArticle.css';


export const CreateArticle = () => {

    const createArticle = (data) => {
        // api call here
        mBlog.post('/api/v1/articles/create', data);
    }

    return (
        <div>
            <Nav />
            <div className="create-edit-container">
                <h1 className="form-header">Create Article</h1>
                <br />
                <Form3 func={createArticle}/>
            </div>
            <Footer />
        </div>
    )
}