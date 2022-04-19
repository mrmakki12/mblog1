import './App.css';
// temp components
// react router components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// pages
import { Landing } from './Pages/Landing/Landing';
import { Profile } from './Pages/Profile/Profile';
import { AllArticles } from './Pages/AllArticles/AllArticles';
import { Article } from './Pages/Article/Article';
import { CreateArticle } from './Pages/CreateArticle/CreateArticle';
import { EditArticle } from './Pages/EditArticle/EditArticle';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Landing />}/>
          <Route exact path='/articles' element={<AllArticles />}/>
          <Route exact path='/articles/:id' element={<Article />} />
          <Route exact path='/create-article' element={<CreateArticle />} />
          <Route exact path='/articles/:id/edit/' element={<EditArticle />} />
          <Route exact path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
