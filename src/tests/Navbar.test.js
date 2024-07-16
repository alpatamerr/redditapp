import React from "react";
import { shallow, render, mount } from "enzyme";
import { Navbar } from "../components/Navbar/Navbar";

describe("<Navbar /> ", () => {
  test("contains logo text", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find("h2").length).toEqual(1);
  });
});