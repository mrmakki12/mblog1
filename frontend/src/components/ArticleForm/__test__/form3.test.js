// test setup
import React from "react";
// component to test
import { Form3 } from '../Form3';
// testing
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


afterEach(cleanup);

// test 1 render without crashing 
test('render Form3 without crashing', () => {
    render(<Form3 />);
});

// test 2 user interaction works as expected
test('user Interation works as expected', () => {
    render(<Form3 />);

    // make sure form is there 
    expect(screen.getAllByRole('textbox').length).toBe(3);

    // get input
    const input = screen.getAllByRole('textbox')[0];

    // change value 
    fireEvent.change(input, { target: { value: 'Hello' } });
 
    // check value 
    expect(input).toHaveValue('Hello');

    // get input 2
    const input1 = screen.getAllByRole('textbox')[1];

    // change value 
    fireEvent.change(input1, { target: { value: 'Hello' } });
 
    // check value 
    expect(input1).toHaveValue('Hello');

    // get input 3
    const input2 = screen.getAllByRole('textbox')[2];

    // change value 
    fireEvent.change(input2, { target: { value: 'Hello' } });
 
    // check value 
    expect(input2).toHaveValue('Hello');
});
