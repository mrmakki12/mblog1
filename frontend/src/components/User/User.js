import React, { useState } from 'react';
// styles 
import './styles/user.css';
// edit text box on click
import EdiText from 'react-editext';
// api
import mBlog from '../../API/mBlog';

export const User = () => {

    // get user
    const fetchUser = async () => {
        const result = await mBlog.get('/api/v1/user');
        return result.data[0];
    };
    const user = fetchUser();

    // state for description
    const [description, setDescription] = useState(user.description);

    // handle save update db
    const handleSave = async (val) => {
        setDescription(val);
        // api call here
        await mBlog.put('/api/v1/description', {description});
    }

    return (
        <div className='user'>
            <div className='avatar'>{user.username && user.username[0]}</div>
            <div className='user-info'>
                <p className='username'>{user && user.username}</p>
                <EdiText type='text' value={description} onSave={handleSave}/>
            </div>
        </div>
    )
}