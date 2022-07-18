import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Input, Form } from "../../index";
import { FormItem } from "./FormItem";

afterEach(() => cleanup);

describe("Form Item tests", () => {
  test("form item should show its child with label", async () => {
    const { container } = render(
      <Form onSubmit={jest.fn()}>
        <FormItem label="test" name="test">
          <Input />
        </FormItem>
        <button type="submit">test</button>
      </Form>
    );

    expect(container.getElementsByClassName("formItem")[0].children.length).toEqual(3);

    expect(container.getElementsByClassName("label")[0]).toHaveTextContent("test");
  });

  test("form item without label should show its child only", async () => {
    const { container } = render(
      <Form onSubmit={jest.fn()}>
        <FormItem name="test">
          <Input />
        </FormItem>
        <button type="submit">test</button>
      </Form>
    );

    expect(container.getElementsByClassName("formItem")[0].children.length).toEqual(2);
  });
});
