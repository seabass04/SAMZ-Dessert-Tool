import React from 'react';
import ReactDOM from 'react-dom';
import about from '../../pages/about';

import {render, cleanup} from '@testing-library/react'
import renderer from "react-test-renderer"

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<about> </about>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<about></about>).toJSON();
    expect(tree).toMatchSnapshot();
})