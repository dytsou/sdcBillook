import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from './SignUp';

// Mock react-router-dom using manual mock
jest.mock('react-router-dom');

// Mock fetch
global.fetch = jest.fn();

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch.mockClear();
  });

  test('SignUp component renders', () => {
    render(<SignUp />);

    expect(screen.getAllByText(/sign up/i).length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('UserName')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText(/split bill easily/i)).toBeInTheDocument();
  });

  test('form submission with empty fields does not call API', async () => {
    render(<SignUp />);

    const submitButton = screen.getAllByText(/sign up/i).find(el => el.closest('button'));
    await userEvent.click(submitButton);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('form submission with whitespace-only fields does not call API', async () => {
    render(<SignUp />);

    const emailInput = screen.getByPlaceholderText('Email');
    const usernameInput = screen.getByPlaceholderText('UserName');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    await userEvent.type(emailInput, '   ');
    await userEvent.type(usernameInput, '   ');
    await userEvent.type(passwordInput, '   ');

    const submitButton = screen.getAllByText(/sign up/i).find(el => el.closest('button'));
    await userEvent.click(submitButton);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('form submission with valid data calls API', async () => {
    global.fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        data: {
          createUser: {
            _id: 'user123',
            email: 'test@example.com',
            username: 'testuser'
          }
        }
      })
    });

    render(<SignUp />);

    const emailInput = screen.getByPlaceholderText('Email');
    const usernameInput = screen.getByPlaceholderText('UserName');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');

    const submitButton = screen.getAllByText(/sign up/i).find(el => el.closest('button'));
    await userEvent.click(submitButton);

    await new Promise(resolve => setTimeout(resolve, 100));

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

  test('form submission handles API error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<SignUp />);

    const emailInput = screen.getByPlaceholderText('Email');
    const usernameInput = screen.getByPlaceholderText('UserName');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');

    const submitButton = screen.getAllByText(/sign up/i).find(el => el.closest('button'));
    await userEvent.click(submitButton);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(global.fetch).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});

