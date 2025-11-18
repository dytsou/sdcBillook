import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';

// Mock Navbar component
jest.mock('./Navbar', () => {
  return function Navbar() {
    return <nav data-testid="navbar">Navbar</nav>;
  };
});

// Mock react-router-dom using manual mock
jest.mock('react-router-dom');

test('Layout renders Navbar and Outlet', () => {
  const { getByTestId } = render(<Layout />);

  expect(getByTestId('navbar')).toBeInTheDocument();
  expect(getByTestId('outlet')).toBeInTheDocument();
});

