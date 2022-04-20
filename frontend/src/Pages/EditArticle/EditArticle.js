import React from "react";
// components 
import { Nav } from '../../components/Nav/Nav';
import { Footer } from "../../components/Footer/Footer";
import { Form3 } from '../../components/ArticleForm/Form3';
// api
import mBlog from "../../API/mBlog";
// react router
import { useParams } from "react-router-dom";
// styles
// import './styles/createArticle.css';


export const EditArticle = () => {

    // used to get article from db
    const { id } = useParams();

    const editArticle = (data) => {
        // api call here
        mBlog.put(`/api/v1/articles/${id}/edit`, data);
    }

    // delete article
    const deleteArticle = (e) => {
        // api call
        mBlog.delete(`/api/v1/articles/${id}/delete`);
    }

    return (
        <div>
            <Nav />
            <div className="create-edit-container">
                <h1 className="form-header">Edit Article</h1>
                <br />
                <Form3 func={editArticle}/>
                <button onClick={(e) => deleteArticle(e)}>DELETE</button>
            </div>
            <Footer />
        </div>
    )
}