import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import AuthContext from '../Store/AuthContent';

// Mock react-router-dom using manual mock
jest.mock('react-router-dom');

// Mock logo asset
jest.mock('../Assets/logo.png', () => 'logo.png');

test('Navbar renders when user is not logged in', () => {
  const mockAuth = {
    isLoggedIn: false,
    token: null,
    userId: null,
    login: jest.fn(),
    logout: jest.fn()
  };

  render(
    <AuthContext.Provider value={mockAuth}>
      <Navbar />
    </AuthContext.Provider>
  );

  expect(screen.getByText('BILLOOK')).toBeInTheDocument();
  expect(screen.getByText('LOGIN')).toBeInTheDocument();
});

test('Navbar renders when user is logged in', () => {
  const mockAuth = {
    isLoggedIn: true,
    token: 'test-token',
    userId: 'test-user-id',
    login: jest.fn(),
    logout: jest.fn()
  };

  render(
    <AuthContext.Provider value={mockAuth}>
      <Navbar />
    </AuthContext.Provider>
  );

  expect(screen.getByText('BILLOOK')).toBeInTheDocument();
  expect(screen.getByText('LOGOUT')).toBeInTheDocument();
});

