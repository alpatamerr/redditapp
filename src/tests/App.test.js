import React from "react";
import { shallow, render } from "enzyme";
import App from "../app/App";

describe("<App /> ", () => {
  test("renders correctly with shallow", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  test("renders correctly with render", () => {
    const wrapper = render(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});