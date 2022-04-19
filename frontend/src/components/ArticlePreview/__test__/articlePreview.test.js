// testing setup
import React from "react";
// component to test
import { ArticlePreview } from '../ArticlePreview';
// react router components
import { BrowserRouter as Router } from "react-router-dom";
// testing 
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// fake data
import { fakeArticle } from '../../../utils/fakedata';

afterEach(cleanup);

// test 1 render ArticlePreview without crashing with props
test('render ArticlePreview without crashing', () => {
    render(
        <Router>
            <ArticlePreview data={fakeArticle}/>
        </Router>
    );
});

// test 2 navigate to article in preview
test('user can click Article preview and be taken to article', () => {
   const { getByRole } = render(
       <Router>
           <ArticlePreview data={fakeArticle} />
       </Router>
   ); 

   // click link
   fireEvent.click(getByRole('link'));

   // expect path to container /article
   expect(window.location.pathname).toBe('/article');
});

