import React, { useState, useEffect } from "react";
// components 
import { ArticlePreview } from "../ArticlePreview/ArticlePreview";
// Api
import mBlog from "../../API/mBlog";
// styles 
import './styles/form2.css';


export const Form2 = () => {
    
    // state for form
    const [searchTerm, setSearchTerm] = useState('');

    // state for articles
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await mBlog.get('/api/v1/articles');
            console.log(result)
            const articles = result.data;
            if(searchTerm !== '') {
                setArticles(articles.filter(article => {
                    return article.title.toLowerCase().includes(searchTerm.toLowerCase())
                }));
            } else {
                setArticles(articles);
            }
        }
        fetchData();
    }, [searchTerm]);

    return (
        <div className="form-results-container">
            <div className="form-container">
                <form>
                    <label htmlFor="search"><h2>Search By Title</h2></label>
                    <input id='search' type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </form>
            </div>
            <div className="result-container">
                <h2>{searchTerm === '' ? 'All Results' : 'Filtered Results'}</h2>
                {/* Filtered Article previews here */}
                {
                    articles.map((article, index) => {
                        return <ArticlePreview data={article} />
                    })
                }
            </div>
        </div>
    
    )
}
