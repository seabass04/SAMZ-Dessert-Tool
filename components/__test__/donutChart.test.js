import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './../donutChart';

import {render, cleanup} from '@testing-library/react'
import renderer from "react-test-renderer"

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<donutChart> </donutChart>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<donutChart></donutChart>).toJSON();
    expect(tree).toMatchSnapshot();
})