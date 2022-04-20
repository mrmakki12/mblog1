import React, { useEffect, useState } from "react";
// router components
import { useParams } from "react-router-dom";
// components 
import { Nav } from "../../components/Nav/Nav";
import { Footer } from "../../components/Footer/Footer";
import { Form4 } from '../../components/Comments/Form4';
import { Author } from '../../components/Author/Author';
// api
import mBlog from "../../API/mBlog";
// markdown to jsx convert
import Markdown from 'markdown-to-jsx';
// styles
import './styles/article.css';

export const Article = () => {

    // id of article
    const { id } = useParams();

    // article state
    const [article, setArticle] = useState({});

    // fetch article here
    useEffect(() => {
        const getArticle = async () => {
            try {
                const result = await mBlog.get(`/api/v1/articles/${id}`);
                console.log(result.data[0]);
                setArticle(result.data[0]);
    
            } catch (error) {

                console.log(error);
            }
        }
        getArticle();
    },[]);

    return (
        <div>
            <Nav />
            <div className="article-comments-container">
                <div>
                    <Author article={article}/>
                </div>
                <br />
                <br />
                <div>
                    <h1>{ article && article.title }</h1>
                    <br />
                    <h2>{ article && article.subtitle }</h2>
                </div>
                <br />
                <br />
                <div>
                    {
                        article.mardown && <Markdown>{article.mardown}</Markdown>
                    }
                </div>
                <br />
                <br />
                <div>
                    <Form4 />
                </div>
            </div>
            <Footer />
        </div>
    )
}
