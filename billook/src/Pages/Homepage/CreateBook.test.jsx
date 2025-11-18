import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateBook from './CreateBook';
import AuthContext from '../../Store/AuthContent';

// Mock react-icons
jest.mock('react-icons/fi', () => ({
  FiUpload: () => <span>Upload</span>
}));

// Mock fetch
global.fetch = jest.fn();

describe('CreateBook Component', () => {
  const mockAuth = {
    isLoggedIn: true,
    token: 'test-token',
    userId: 'test-user-id',
    login: jest.fn(),
    logout: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch.mockClear();
  });

  test('CreateBook renders when user is logged in', () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <CreateBook />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/create new account book/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your book name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter group announcement here...')).toBeInTheDocument();
  });

  test('CreateBook does not submit when user is not logged in', async () => {
    const mockAuthNotLoggedIn = {
      isLoggedIn: false,
      token: null,
      userId: null,
      login: jest.fn(),
      logout: jest.fn()
    };

    render(
      <AuthContext.Provider value={mockAuthNotLoggedIn}>
        <CreateBook />
      </AuthContext.Provider>
    );

    const bookNameInput = screen.getByPlaceholderText('Your book name');
    await userEvent.type(bookNameInput, 'Test Book');

    const submitButton = screen.getByText('Create');
    await userEvent.click(submitButton);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('form submission with empty book name does not call API', async () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <CreateBook />
      </AuthContext.Provider>
    );

    const submitButton = screen.getByText('Create');
    await userEvent.click(submitButton);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('form submission with whitespace-only book name does not call API', async () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <CreateBook />
      </AuthContext.Provider>
    );

    const bookNameInput = screen.getByPlaceholderText('Your book name');
    await userEvent.type(bookNameInput, '   ');

    const submitButton = screen.getByText('Create');
    await userEvent.click(submitButton);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('form submission with valid data calls API', async () => {
    global.fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        data: {
          createBook: {
            _id: 'book123',
            name: 'Test Book',
            board: 'Test announcement',
            creator: {
              _id: 'user123',
              username: 'testuser'
            }
          }
        }
      })
    });

    render(
      <AuthContext.Provider value={mockAuth}>
        <CreateBook />
      </AuthContext.Provider>
    );

    const bookNameInput = screen.getByPlaceholderText('Your book name');
    const bulletinBoardInput = screen.getByPlaceholderText('Enter group announcement here...');
    
    await userEvent.type(bookNameInput, 'Test Book');
    await userEvent.type(bulletinBoardInput, 'Test announcement');

    const submitButton = screen.getByText('Create');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/graphql',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token'
          }
        })
      );
    });
  });

  test('form submission uses default announcement when bulletin board is empty', async () => {
    global.fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        data: {
          createBook: {
            _id: 'book123',
            name: 'Test Book',
            board: 'No announcement',
            creator: {
              _id: 'user123',
              username: 'testuser'
            }
          }
        }
      })
    });

    render(
      <AuthContext.Provider value={mockAuth}>
        <CreateBook />
      </AuthContext.Provider>
    );

    const bookNameInput = screen.getByPlaceholderText('Your book name');
    await userEvent.type(bookNameInput, 'Test Book');

    const submitButton = screen.getByText('Create');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      const callArgs = global.fetch.mock.calls[0][1];
      const body = JSON.parse(callArgs.body);
      expect(body.query).toContain('No announcement');
    });
  });

  test('file input exists and can be interacted with', () => {
    const { container } = render(
      <AuthContext.Provider value={mockAuth}>
        <CreateBook />
      </AuthContext.Provider>
    );

    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
    
    // Verify the photo name display shows default value
    expect(screen.getByDisplayValue('No file chosen')).toBeInTheDocument();
  });

  test('form submission handles API error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    global.fetch.mockResolvedValueOnce({
      status: 400,
      json: async () => ({ errors: [{ message: 'Failed to create book' }] })
    });

    render(
      <AuthContext.Provider value={mockAuth}>
        <CreateBook />
      </AuthContext.Provider>
    );

    const bookNameInput = screen.getByPlaceholderText('Your book name');
    await userEvent.type(bookNameInput, 'Test Book');

    const submitButton = screen.getByText('Create');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});

