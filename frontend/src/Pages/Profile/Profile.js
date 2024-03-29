import React, { useEffect, useState } from 'react';
// styles 
import './styles/profile.css';
// components
import { User } from '../../components/User/User';
import { Nav } from '../../components/Nav/Nav';
import { ArticlePreview } from '../../components/ArticlePreview/ArticlePreview';
import { Footer } from '../../components/Footer/Footer';
// react router components 
import { Link } from 'react-router-dom';
// api 
import mBlog from '../../API/mBlog';

export const Profile = () => {

    // articles belonging to user
    const [articles, setArticles] = useState([]);

    // fetch articles
    useEffect(() => {
        const fetchArticles = async () => {
            const results = await mBlog.get('/api/v1/user/articles');
            setArticles(results.data);
            console.log(results)
        }
        fetchArticles();
    }, []);

    return (
        <div>
            <Nav />
            <div className='profile-container'>
                <div className='profile-articles'>
                    <h2>Your Articles <Link title='Add Article' to='/create-article'>+</Link></h2>
                    <div>
                        {
                            articles && articles.map(article => {
                                return (
                                    <div className='profile-article-prev'>
                                        <ArticlePreview data={article} />
                                        <Link to={`/articles/${article.id}/edit`}>
                                            <img src='/images/edit.png' alt='edit' height={20} width={20}/>
                                        </Link>
                                    </div>
                                    )
                            })
                        }
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