import React, { useEffect, useState } from "react";
// react router components
import { useParams } from 'react-router-dom';
// api
import mBlog from "../../API/mBlog";
// styles
import './styles/form3.css';

export const Form3 = ({func}) => {

    // used in case of editing article
    const { id } = useParams();

    // state for article
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [markdown, setMarkdown] = useState('');

    // in case if form used for editing
    // api call and set state with info in rows
    useEffect(() => {
        if( id ) {
            const fetchArticle = async () => {
                const result = await mBlog.get(`/api/v1/articles/${id}`);
                console.log(result)
                setTitle(result.data[0].title);
                setSubtitle(result.data[0].subtitle);
                setMarkdown(result.data[0].mardown);
            }
            fetchArticle();
        }
    }, []);
    

    // submit article/changes
    const handleSubmit = (e) => {
        e.preventDefault();
        // api call here
        func({title, subtitle, markdown});
        setMarkdown('');
        setSubtitle('');
        setTitle('');
        alert('Article Edit / Creation successful');
    }

    return(
        <form className="form3">
            <div className="input-container">
                <label htmlFor="title"><h1>Title</h1></label>
                <br />
                <input
                    id='title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <br />
            <div className="input-container">
                <label htmlFor="subtitle"><h1>Subtitle</h1></label>
                <br />
                <input
                    id='subtitle'
                    type='text'
                    value={subtitle ? subtitle : ''}
                    onChange={(e) => setSubtitle(e.target.value)}
                />
            </div>
            <br />
            <div className="input-container">
                <label htmlFor="markdown"><h1>Markdown</h1></label>
                <br />
                <textarea
                    id='markdown'
                    type='text'
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                />
            </div>
            <br />
            <div>
                <button
                    onClick={(e) => handleSubmit(e)}>
                    Submit
                </button>
            </div>
        </form>
    )
}