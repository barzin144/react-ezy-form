import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Form } from "./Form";
import { FormValues, ValidationType } from "../../types";
import { FormItem } from "../Item/FormItem";
import { Input, PasswordInput } from "../../index";

export default {
  title: "Components/Form",
  component: Form,
} as ComponentMeta<typeof Form>;

export const HorizentalForm: ComponentStory<typeof Form> = (args) => (
  <Form {...args} horizontal>
    <FormItem
      label="Username"
      name="username"
      rules={[
        {
          type: ValidationType.required,
          message: "Please enter your username",
        },
      ]}
    >
      <Input placeholder="Enter your username" />
    </FormItem>
    <FormItem
      label="Email"
      name="email"
      rules={[
        {
          type: ValidationType.required,
          message: "Please enter your email",
        },
        {
          type: ValidationType.regex,
          message: "You have entered an invalid email address",
          regexPattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
      ]}
    >
      <Input placeholder="Enter your email" />
    </FormItem>
    <div className="buttonContainer">
      <button type="submit" className="button button--primary">
        Login
      </button>
    </div>
  </Form>
);

export const VerticalForm: ComponentStory<typeof Form> = (args) => (
  <Form {...args}>
    <FormItem
      label="Username"
      name="username"
      rules={[
        {
          type: ValidationType.required,
          message: "Please enter your username",
        },
      ]}
    >
      <Input placeholder="Enter your username" />
    </FormItem>
    <FormItem
      label="Email"
      name="email"
      rules={[
        {
          type: ValidationType.required,
          message: "Please enter your email",
        },
        {
          type: ValidationType.regex,
          message: "You have entered an invalid email address",
          regexPattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
      ]}
    >
      <Input placeholder="Enter your email" />
    </FormItem>
    <div className="buttonContainer">
      <button type="submit" className="button button--primary">
        Login
      </button>
      <button className="button button--secondary">Close</button>
    </div>
  </Form>
);

export const FormWithDefaultValues: ComponentStory<typeof Form> = (args) => {
  const defaultValues: FormValues = {
    username: "test",
    password: "123",
  };
  return (
    <Form defaultValues={defaultValues} {...args}>
      <FormItem label="Username" name="username">
        <Input placeholder="Enter your username" />
      </FormItem>
      <FormItem label="Password" name="password">
        <PasswordInput placeholder="Enter your password" />
      </FormItem>
      <div className="buttonContainer">
        <button type="submit" className="button button--primary">
          Login
        </button>
        <button className="button button--secondary">Close</button>
      </div>
    </Form>
  );
};

export const FormWithValidation: ComponentStory<typeof Form> = (args) => {
  return (
    <Form {...args}>
      <FormItem
        label="Username"
        name="username"
        rules={[
          {
            type: ValidationType.required,
            message: "Please enter your username",
          },
        ]}
      >
        <Input placeholder="Enter your username" />
      </FormItem>
      <FormItem
        label="Email"
        name="email"
        rules={[
          {
            type: ValidationType.required,
            message: "Please enter your email",
          },
          {
            type: ValidationType.regex,
            message: "You have entered an invalid email address",
            regexPattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          },
        ]}
      >
        <Input placeholder="Enter your email" />
      </FormItem>
      <FormItem
        label="Password"
        name="password"
        rules={[
          {
            type: ValidationType.custom,
            message: "Your password is too easy",
            validationFunction: (formValue) => {
              return formValue["password"] !== "123";
            },
          },
        ]}
      >
        <PasswordInput placeholder="Enter your password" />
      </FormItem>
      <div>
        <button type="submit" className="button button--primary">
          Submit
        </button>
      </div>
    </Form>
  );
};
