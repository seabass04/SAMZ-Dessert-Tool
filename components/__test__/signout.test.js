import React from 'react';
import ReactDOM from 'react-dom';
import logout from "../../pages/signout";
import { render } from '@testing-library/react';

describe("User logout componenent", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<logout/>, div)
    });

    it("user initially null", () => {
        const { queryByTestId } = render(<logout/>);
        const div = queryByTestId("accmenu div");
        expect(div).toBeFalsy();
    });
})