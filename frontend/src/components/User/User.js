import React, { useState } from 'react';
// styles 
import './styles/user.css';
// edit text box on click
import EdiText from 'react-editext';
// fake data
import { fakeUser } from '../../utils/fakedata';
// api


export const User = () => {

    const user = fakeUser;

    // state for description
    const [description, setDescription] = useState(user.description);

    // handle save update db
    const handleSave = (val) => {
        setDescription(val);
        // api call here
    }


    return (
        <div className='user'>
            <div className='avatar'>{user.username[0]}</div>
            <div className='user-info'>
                <p className='username'>{user.username}</p>
                <EdiText type='text' value={description} onSave={handleSave}/>
            </div>
        </div>
    )
}