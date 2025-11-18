import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './Login';
import AuthContext from '../../Store/AuthContent';

// Mock react-router-dom using manual mock
jest.mock('react-router-dom');

// Mock fetch
global.fetch = jest.fn();

test('Login component renders', () => {
  const mockAuth = {
    isLoggedIn: false,
    token: null,
    userId: null,
    login: jest.fn(),
    logout: jest.fn()
  };

  render(
    <AuthContext.Provider value={mockAuth}>
      <Login />
    </AuthContext.Provider>
  );

  // Check for form elements or text that should be present
  // There are multiple "Sign In" elements (header and button), so use getAllByText
  expect(screen.getAllByText(/sign in/i).length).toBeGreaterThan(0);
});

