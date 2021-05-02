import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";


describe("ProfileStatus component", () => {
  test("Status from props should be in local state", () => {
    const component = create(<ProfileStatus status="I learn React JS" />);
    const instance = component.getInstance();
    expect(instance.state.statusText).toBe("I learn React JS");
  });
  test("span child's node ", () => {
    const component = create(<ProfileStatus status="I learn React JS" />);
    const instance = component.root;
    const span = instance.findByType("span");
    expect(span.children[0]).toBe('I learn React JS');
  });
  test("should not be input, after create component ", () => {
    const component = create(<ProfileStatus status="I learn React JS" />);
    const root = component.root;
    expect(() => {
      root.findByType("input")
    }).toThrow()
  });

  test("input should be displayed in edit mode", () => {
    const component = create(<ProfileStatus status="I learn React JS" />);
    const root = component.root;
    const span = root.findByType("span");
    span.parent.props.onDoubleClick();
    let input = root.findByType("input")

    expect(input.props.value).toBe("I learn React JS");
  });
  test('callback should be called', () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status="I learn React JS" setStatus={mockCallback} />);
    const instance = component.getInstance();
    instance.saveStatus();
    expect(mockCallback.mock.calls.length).toBe(1);

  });
});