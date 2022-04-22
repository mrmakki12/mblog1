import React, { useEffect, useState } from "react";
// components
import { Comment } from '../Comment/Comment';
// API
import mBlog from '../../API/mBlog';
// styles
import './styles/form4.css';
// router dom 
import { useParams, useNavigate } from "react-router-dom";

export const Form4 = () => {

    const { id } = useParams();

    // comment state for submit comment
    const [comment, setComment] = useState('');

    // comments already linked to article
    const [comments, setComments] = useState([]);

    // going to use this to refresh page on submit to get new comment
    const navigate = useNavigate();

    // submit comments
    const handleSubmit = (e) => {
        e.preventDefault();
        // api call here
        mBlog.post(`/api/v1/articles/${id}/comments`, {article_id: id, user_name: 'TyreeckGoat', comments: comment, created: new Date().toISOString()});
        setComment('');
        navigate(0);
    }

    // fetch comments 
    useEffect(() => {

        const fetchComments = async () => {
            try {
                const result = await mBlog.get(`/api/v1/articles/${id}/comments`);
                setComments(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchComments();
        console.log('useEffect called');
    },[]); 

    return (
        <div>
            <div>
                <h1>Leave A Comment</h1>
                <br></br>
                <div>
                    {/* form to leave comment */}
                    <form className="comment-form">
                        <textarea 
                            type='text' 
                            placeholder="Your Comment"
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button 
                            type='submit'
                            disabled={comment.length === 0 ? true : false }
                            onClick={(e) => handleSubmit(e)}
                            >Submit
                        </button>
                    </form>
                </div>
                <br />
                <h2>Comments</h2>
                <br />
            </div>
            {/* Render comments here */}
            <div>
                {
                    comments.map(comment => {
                        return <Comment comment={comment} />
                    })
                }
            </div>
        </div>
    )
}