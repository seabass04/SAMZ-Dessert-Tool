import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../../pages/about';

import {render, cleanup} from '@testing-library/react'
import renderer from "react-test-renderer"

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Home> </Home>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<Home></Home>).toJSON();
    expect(tree).toMatchSnapshot();
})