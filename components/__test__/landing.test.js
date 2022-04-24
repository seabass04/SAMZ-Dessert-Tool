import React from 'react';
import ReactDOM from 'react-dom';
import landing from '../../pages/landing';

import {render, cleanup} from '@testing-library/react'
import renderer from "react-test-renderer"

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<landing> </landing>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<landing></landing>).toJSON();
    expect(tree).toMatchSnapshot();
})