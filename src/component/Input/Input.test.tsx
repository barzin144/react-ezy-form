import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Input, PasswordInput } from './Input';

afterEach(() => cleanup);

describe('Input tests', () => {
  test('input without place holder should be empty', async () => {
    render(<Input />);
    expect(screen.getByRole('textbox').getAttribute('placeholder')).toBeNull();
  });

  test('text input should have text type', async () => {
    render(<Input />);
    expect(screen.getByRole('textbox').getAttribute('type')).toEqual('text');
  });

  test("input's place holder should be test", async () => {
    render(<Input placeholder="test" />);
    expect(screen.getByRole('textbox').getAttribute('placeholder')).toEqual('test');
  });

  test('password input should have password type', async () => {
    const { container } = render(<PasswordInput />);
    const passwordInput = container.getElementsByClassName('textbox--password')[0];
    expect(passwordInput.getAttribute('type')).toEqual('password');
  });

  test('password input should remove password attribute when mouse down on passwordEye icon', async () => {
    const { container } = render(<PasswordInput />);
    const passwordInput = container.getElementsByClassName('textbox')[0];
    const passwordEyeIcon = container.getElementsByClassName('inputIcon')[0].childNodes[0];

    fireEvent.mouseDown(passwordEyeIcon);
    expect(passwordInput.getAttribute('type')).toEqual('text');
  });
});
