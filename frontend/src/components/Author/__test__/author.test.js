// test setup
import React from "react";
// component to test 
import { Author } from '../Author';
// testing
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// test 1 render Author with data without crashing
test('render Author with data without crashing', () => {
    render(<Author />);
});