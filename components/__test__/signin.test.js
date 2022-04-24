import React from 'react';
import ReactDOM from 'react-dom';
import googleSignIn from "../../pages/googleSignInButton.js";
import { render } from '@testing-library/react';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<googleSignIn/>, div)
});

it("user initially null", () => {
    const { queryByTestId } = render(<logout/>);
    const div = queryByTestId("accmenu div");
    expect(div).toBeFalsy();
});