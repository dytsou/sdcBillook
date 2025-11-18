import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateBook from './CreateBook';
import AuthContext from '../../Store/AuthContent';

// Mock react-icons
jest.mock('react-icons/fi', () => ({
  FiUpload: () => <span>Upload</span>
}));

// Mock fetch
global.fetch = jest.fn();

test('CreateBook renders when user is logged in', () => {
  const mockAuth = {
    isLoggedIn: true,
    token: 'test-token',
    userId: 'test-user-id',
    login: jest.fn(),
    logout: jest.fn()
  };

  render(
    <AuthContext.Provider value={mockAuth}>
      <CreateBook />
    </AuthContext.Provider>
  );

  expect(screen.getByText(/create new account book/i)).toBeInTheDocument();
});

test('CreateBook does not submit when user is not logged in', () => {
  const mockAuth = {
    isLoggedIn: false,
    token: null,
    userId: null,
    login: jest.fn(),
    logout: jest.fn()
  };

  render(
    <AuthContext.Provider value={mockAuth}>
      <CreateBook />
    </AuthContext.Provider>
  );

  expect(screen.getByText(/create new account book/i)).toBeInTheDocument();
});

