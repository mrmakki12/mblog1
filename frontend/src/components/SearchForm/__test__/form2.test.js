// test setup
import React from "react";
// component to test
import { Form2 } from '../Form2';
// testing
import { cleanup, fireEvent, getByLabelText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

// test 1 render without crashing
test('render SearchForm without crashing', () => {
    render(<Form2 />);
});

// test 2 make sure input works
test('SearchForm interacts as expected', () => {
    render(<Form2 />);

    // get input
    const input = screen.getByRole('textbox');

    // change input 
    fireEvent.change(input, {target: {value: 'Hello'}});

    // check input value
    expect(input).toHaveValue('Hello');
});