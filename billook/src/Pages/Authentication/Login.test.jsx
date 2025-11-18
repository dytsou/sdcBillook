import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import AuthContext from '../../Store/AuthContent';

// Mock react-router-dom using manual mock
jest.mock('react-router-dom');

// Mock fetch
global.fetch = jest.fn();

describe('Login Component', () => {
  const mockAuth = {
    isLoggedIn: false,
    token: null,
    userId: null,
    login: jest.fn(),
    logout: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch.mockClear();
  });

  test('Login component renders', () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <Login />
      </AuthContext.Provider>
    );

    expect(screen.getAllByText(/sign in/i).length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText(/split bill easily/i)).toBeInTheDocument();
  });

  test('form submission with empty fields does not call API', async () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <Login />
      </AuthContext.Provider>
    );

    const submitButton = screen.getAllByText(/sign in/i).find(el => el.closest('button'));
    await userEvent.click(submitButton);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('form submission with whitespace-only fields does not call API', async () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <Login />
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(emailInput, '   ');
    await userEvent.type(passwordInput, '   ');

    const submitButton = screen.getAllByText(/sign in/i).find(el => el.closest('button'));
    await userEvent.click(submitButton);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('form submission with valid credentials calls API and login function', async () => {
    const mockLogin = jest.fn();
    const mockAuthWithLogin = { ...mockAuth, login: mockLogin };

    global.fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        data: {
          login: {
            userId: 'user123',
            token: 'token123',
            tokenExpiration: 3600
          }
        }
      })
    });

    render(
      <AuthContext.Provider value={mockAuthWithLogin}>
        <Login />
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    const submitButton = screen.getAllByText(/sign in/i).find(el => el.closest('button'));
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/graphql',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })
      );
    });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('token123', 'user123');
    });
  });

  test('form submission handles API error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    global.fetch.mockResolvedValueOnce({
      status: 400,
      json: async () => ({ errors: [{ message: 'Invalid credentials' }] })
    });

    render(
      <AuthContext.Provider value={mockAuth}>
        <Login />
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'wrongpassword');

    const submitButton = screen.getAllByText(/sign in/i).find(el => el.closest('button'));
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  test('form submission handles network error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <AuthContext.Provider value={mockAuth}>
        <Login />
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    const submitButton = screen.getAllByText(/sign in/i).find(el => el.closest('button'));
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});

