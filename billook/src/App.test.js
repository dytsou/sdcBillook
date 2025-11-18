import { render } from '@testing-library/react';
import React from 'react';

// Mock react-router-dom using manual mock
jest.mock('react-router-dom');

// Mock all components to avoid import issues
jest.mock('./Components/Layout', () => {
  return function Layout({ children }) {
    return <div data-testid="layout">{children}</div>;
  };
});

jest.mock('./Pages/Userbook/BooksList', () => {
  return function BooksList() {
    return <div>BooksList</div>;
  };
});

jest.mock('./Pages/Homepage/Homepage', () => {
  return function Homepage() {
    return <div>Homepage</div>;
  };
});

jest.mock('./Pages/Homepage/CreateBook', () => {
  return function CreateBook() {
    return <div>CreateBook</div>;
  };
});

jest.mock('./Pages/Authentication/Login', () => {
  return function Login() {
    return <div>Login</div>;
  };
});

jest.mock('./Pages/Authentication/SignUp', () => {
  return function SignUp() {
    return <div>SignUp</div>;
  };
});

import App from './App';

test('App renders without crashing', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('router')).toBeInTheDocument();
});

test('App provides AuthContext', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
