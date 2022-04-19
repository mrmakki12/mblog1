import React from "react";
// date convertor
const moment = require('moment');

export const Comment = ({comment}) => {

    return (
        <div className="preview-container">
            <div className="preview-profile">
                <div>{comment.user_name && comment.user_name[0]}</div>
                <p>{comment.user_name}</p>
            </div>
            <div className="article-info">
                <p>{comment.comments}</p>
            </div>
            <div className="date">
                <p>{moment(comment.created).format('MMMM Do YYYY')}</p>
            </div>
        </div>
    )
}