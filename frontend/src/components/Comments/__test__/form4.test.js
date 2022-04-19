// test setup
import React from "react";
// component to test 
import { Form4 } from '../Form4';
// testing 
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


afterEach(cleanup);

// test 1 render without crashing 
test('render Comments without crashing', () => {
    render(<Form4 />);
});

// test 2 user interation works as expected
test('user interaction with Comments form works as expected', () => {
    render(<Form4 />);

    // make sure form is there
    expect(screen.getByRole('textbox')).toBeDefined();

    // get input
    const input = screen.getByRole('textbox');

    // change value 
    fireEvent.change(input, { target: { value: 'Hello' } });
 
    // check value 
    expect(input).toHaveValue('Hello');
});

