// testing setup
import React from "react";
// component to test
import { Comment } from '../Comment';
// testing 
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// fake data
import { fakeComment } from '../../../utils/fakedata';

// test 1 render Comment with props without crashing
test('render Comment with props without crashing', () => {
    render(<Comment comment={fakeComment}/>);
});
