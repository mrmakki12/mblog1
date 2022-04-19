import React from 'react';
// styles 
import './styles/profile.css';
// components
import { User } from '../../components/User/User';
import { Nav } from '../../components/Nav/Nav';
import { ArticlePreview } from '../../components/ArticlePreview/ArticlePreview';
import { Footer } from '../../components/Footer/Footer';
// react router components 
import { Link } from 'react-router-dom';
// fake data
import { fakeArticle } from '../../utils/fakedata';

export const Profile = () => {

    return (
        <div>
            <Nav />
            <div className='profile-container'>
                <div className='profile-articles'>
                    <h2>Your Articles <Link title='Add Article' to='/create-article'>+</Link></h2>
                    <div>
                        <ArticlePreview data={fakeArticle}/>
                            <br />
                        <ArticlePreview data={fakeArticle}/>
                        <br />
                        <ArticlePreview data={fakeArticle}/>
                        <br />
                        <ArticlePreview data={fakeArticle}/>
                    </div>
                </div>
                <div>
                    <User />
                </div>
            </div>
            <Footer />
        </div>
    )
}