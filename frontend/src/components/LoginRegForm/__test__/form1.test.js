// test setup
import React from "react";
// component to test
import { Form1 } from '../Form1';
// testing 
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

// test 1 render without crahsing
test('render Form1 without crashing', () => {
    render(<Form1 />);
});

// test 2 make sure it has form input 
test('make sure Form1 has a 2 form', () => {
    const { getAllByRole } = render(<Form1 />);

    expect(getAllByRole('form').length).toBe(2);    
});

// test 3 makeu sure user can change input
test('Form interaction works as expected', () => {
    render(<Form1 />);

    // get input 1
    const input = screen.getAllByRole('textbox')[0];

    // change input 1 
    fireEvent.change(input, {target: {value: 'Hello'}});

    // check input 1 value 
    expect(input).toHaveValue('Hello');

    // get input 2
    const input1 = screen.getAllByRole('textbox')[1];

    // change input 2 
    fireEvent.change(input1, {target: {value: 'Hello'}});

    // check input 2 value 
    expect(input1).toHaveValue('Hello');

});