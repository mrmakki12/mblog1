// test setup 
import React from "react";
// component to test
import { Footer } from '../Footer.js';
// testing 
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

afterEach(cleanup);

// test 1 render without crashing 
test('render Footer without crashing', () => {
    render(<Footer />);
});

// test 2 render with proper text 
test('make sure it has the text', () => {
    const { getByText } = render(<Footer />);

    expect(getByText(/made with/i)).toBeDefined();
    expect(getByText(/by:/i)).toBeDefined();
    expect(getByText(/tyreeck makki!/i)).toBeDefined();
});

// test 3 test if has anchor 
test('make sure it has an anchor to my portfolio', () => {
    render(<Footer />);

    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://tyreeckcodes.com');
});

// snapshot
test("matches snapshot", () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
});