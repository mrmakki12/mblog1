// test setup
import React from 'react';
// component to test
import { Nav } from '../Nav';
// react router components
import { BrowserRouter as Router } from 'react-router-dom';
// testing 
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

// test 1 render without crashing 
test('render Nav without crashing', () => {
    render(
        <Router>
            <Nav />
        </Router>
    );
});

// test 2 make sure it has everyting 
test('make sure it has proper links and button', () => {
    render(
        <Router>
            <Nav />
        </Router>
    );

    // button defined
    expect(screen.getByRole('button')).toBeDefined();

    // links defined
    expect(screen.getAllByRole('link').length).toBe(2);
});

// test 3 user can navigate to All Articles page
test('user can navigate to All Articles', () => {
    const { getByText } = render(
        <Router>
            <Nav />
        </Router>
    );

    // click all Articles
    fireEvent.click(getByText('All Articles'));

    // expect path to be all-articles
    expect(document.location.pathname).toBe('/all-articles');
});

// test 4 user can naviage to Profile
test('user can navigate to profile', () => {
    const { getAllByRole } = render(
        <Router>
            <Nav />
        </Router>
    );

    // click on profile
    fireEvent.click(getAllByRole('link')[1]);

    // expact path to be /profile
    expect(document.location.pathname).toBe('/profile');
});

// test 5 user can hit logout button get sent to Login/register page
test('user ends up on login/register page when they hit logout button', () => {
    const { getByRole } = render(
        <Router>
            <Nav />
        </Router>
    );

    // click on button
    fireEvent.click(getByRole('button'));

    // expect path to be /
    expect(document.location.pathname).toBe('/');
});
