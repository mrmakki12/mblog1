import React from "react";
// react router components
import { useNavigate } from "react-router-dom";
// styles
import './styles/articlePrev.css';
// time converter
const moment = require('moment');

export const ArticlePreview = ({data}) => {

    // navigate to different page
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/articles/${data.id}`)
    }
    return (
        <div className="preview-container" onClick={(e) => handleClick(e)}>
            <div className="preview-profile">
                <div>{data.user_name && data.user_name[0]}</div>
                <p>{data.user_name && data.user_name}</p>
            </div>
            <div className="article-info">
                <h3>{data.title}</h3>
                <p>{data.subTitle}</p>
            </div>
            <div className="date">
                <p>{moment(data.created).format('MMMM Do YYYY')}</p>
            </div>
        </div>

    )
}