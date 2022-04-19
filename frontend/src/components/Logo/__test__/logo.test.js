// test setup
import React from "react";
// component to test
import { Logo } from '../Logo';
// testing
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

afterEach(cleanup);

// test 1 render without crashing
test('render Logo without crashing', () => {
    render(<Logo />);
});

// test 2 make sure it has img
test('make sure Logo has image', () => {
    render(<Logo />);

    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/markdown.png');
});

// test 3 make sure it has text
test('make sure Logo has text', () => {
    const { getByText } = render(<Logo />);

    expect(getByText(/blog/i)).toBeDefined();
});

// snapshot
test('matches snapshot', () => {
    const tree = renderer.create(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
});