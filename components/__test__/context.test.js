import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContext, GetUser } from "../contexts/CurrentUser";
import { render } from '@testing-library/react';

describe("context hook test", () => {
    const con = null;
    const useContext = jest.fn();
    let wrapper;
    beforeEach(() => {
        wrapper = useContext(con);
    })

    it("renders null user", () => {
        expect(wrapper).toBeFalsy();
    });

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<GetUser/>, div)
    });
})