import React from 'react';
import ReactDOM from 'react-dom';
import Samz from '../../pages/samz';

import {render, cleanup} from '@testing-library/react'
import renderer from "react-test-renderer"

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Samz> </Samz>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<Samz></Samz>).toJSON();
    expect(tree).toMatchSnapshot();
})