import React from "react";
import { createShallow, createMount } from "@mui/material/test-utils";
import { Searchbar } from "../components/Navbar/Searchbar/Searchbar";

describe("<Searchbar />", () => {
  let shallow;
  let mount;

  beforeAll(() => {
    shallow = createShallow();
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  test("renders correctly", () => {
    const wrapper = shallow(<Searchbar />);
    expect(wrapper.exists()).toBeTruthy();
  });

  test("renders input element with placeholder", () => {
    const wrapper = shallow(<Searchbar />);
    const placeholder = "Search...";
    expect(wrapper.props().children.props.placeholder).toEqual(placeholder);
  });
});