import React from 'react';
import { render, screen } from '@testing-library/react';
import BooksList from './BooksList';
import AuthContext from '../../Store/AuthContent';

// Mock BookListItem
jest.mock('./BookListItem', () => {
  return function BookListItem({ BookName, BookDesc, BookCover }) {
    return <div data-testid="book-item">{BookName}</div>;
  };
});

// Mock fetch
global.fetch = jest.fn();

test('BooksList renders when user is not logged in', () => {
  const mockAuth = {
    isLoggedIn: false,
    token: null,
    userId: null,
    login: jest.fn(),
    logout: jest.fn()
  };

  const { getByText } = render(
    <AuthContext.Provider value={mockAuth}>
      <BooksList />
    </AuthContext.Provider>
  );

  expect(getByText(/please login to view your book/i)).toBeInTheDocument();
});

test('BooksList renders when user is logged in', () => {
  const mockAuth = {
    isLoggedIn: true,
    token: 'test-token',
    userId: 'test-user-id',
    login: jest.fn(),
    logout: jest.fn()
  };

  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: { user: { createdBooks: [] } } })
  });

  const { container } = render(
    <AuthContext.Provider value={mockAuth}>
      <BooksList />
    </AuthContext.Provider>
  );

  expect(container).toBeTruthy();
});

