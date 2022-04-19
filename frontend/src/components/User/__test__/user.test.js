// test setup 
import React from 'react';
// component to test 
import { User } from '../User';
// testing 
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

// test 1 render without crashing 
test('render User without crashing', () => {
    render(<User />);
});
