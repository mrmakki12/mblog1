import React from "react";
// styles
import './styles/author.css';
// time convertor
const moment = require('moment');

export const Author = ({article}) => {

    return (
        <div className="author-container">
            <div className='author-info'>
                <div className="author-avatar">
                    <h2>{article.user_name && article.user_name[0]}</h2>
                </div>
                <p>Written By: {article.user_name}</p>
            </div>
            <div>
                <p>{moment(article.created).format('MMMM Do YYYY')}</p>
            </div>
        </div>
    )
}