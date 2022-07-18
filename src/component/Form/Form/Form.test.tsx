import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import { Input } from "../../Input/Input";
import { FormValues, ValidationType } from "../../types";
import { Form } from "./Form";
import { FormItem } from "../Item/FormItem";

afterEach(() => cleanup);

describe("Form tests", () => {
  test("form should render the fromItem and return formData as an object", async () => {
    let formValues: FormValues = {
      username: "",
    };

    const { container } = render(
      <Form onSubmit={(values) => (formValues = values)}>
        <FormItem label="Username" name="username">
          <Input placeholder="Enter your username" />
        </FormItem>
        <div>
          <button type="submit">Save</button>
        </div>
      </Form>
    );
    const usernameInput = container.querySelectorAll("#username")[0];
    const submitButton = screen.getByRole("button");
    fireEvent.change(usernameInput, { target: { value: "testUsername" } });
    fireEvent.click(submitButton);

    expect(formValues.username).toEqual("testUsername");
  });

  test("form should show an error for required formItem", async () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>
        <FormItem
          label="Username"
          name="username"
          rules={[{ type: ValidationType.required, message: "requiredError" }]}
        >
          <Input placeholder="Enter your username" />
        </FormItem>
        <div>
          <button type="submit">Save</button>
        </div>
      </Form>
    );
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);
    const validationError = container.getElementsByClassName("validationError")[0];

    expect(validationError).toHaveTextContent("requiredError");
    expect(onSubmit).toBeCalledTimes(0);
  });

  test("form should show an error for formItem with regex validation", async () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>
        <FormItem
          label="Email"
          name="email"
          rules={[
            {
              type: ValidationType.regex,
              regexPattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "regexError",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </FormItem>
        <div>
          <button type="submit">Save</button>
        </div>
      </Form>
    );
    const emailInput = container.querySelectorAll("#email")[0];
    const submitButton = screen.getByRole("button");
    fireEvent.change(emailInput, { target: { value: "email" } });
    fireEvent.click(submitButton);
    const validationError = container.getElementsByClassName("validationError")[0];

    expect(validationError).toHaveTextContent("regexError");
    expect(onSubmit).toBeCalledTimes(0);
  });

  test("form should not show an error for formItem with regex validation", async () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>
        <FormItem
          label="Email"
          name="email"
          rules={[
            {
              type: ValidationType.regex,
              regexPattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "regexError",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </FormItem>
        <div>
          <button type="submit">Save</button>
        </div>
      </Form>
    );
    const emailInput = container.querySelectorAll("#email")[0];
    const submitButton = screen.getByRole("button");
    fireEvent.change(emailInput, { target: { value: "email@gmail.com" } });
    fireEvent.click(submitButton);
    const validationErrorContainer = container.getElementsByClassName(
      "validationErrorsContainer"
    )[0];

    expect(validationErrorContainer.children.length).toEqual(0);
    expect(onSubmit).toBeCalledTimes(1);
  });

  test("form should not show an error for required formItem", async () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>
        <FormItem
          label="Username"
          name="username"
          rules={[{ type: ValidationType.required, message: "requiredError" }]}
        >
          <Input placeholder="Enter your username" />
        </FormItem>
        <div>
          <button type="submit">Save</button>
        </div>
      </Form>
    );
    const usernameInput = container.querySelectorAll("#username")[0];
    const submitButton = screen.getByRole("button");
    fireEvent.change(usernameInput, { target: { value: "testUsername" } });
    fireEvent.click(submitButton);
    const validationErrorContainer = container.getElementsByClassName(
      "validationErrorsContainer"
    )[0];

    expect(validationErrorContainer.children.length).toEqual(0);
    expect(onSubmit).toBeCalledTimes(1);
  });
});
