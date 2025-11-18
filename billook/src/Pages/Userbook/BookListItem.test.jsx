import React from 'react';
import { render, screen } from '@testing-library/react';
import BookListItem from './BookListItem';

test('BookListItem renders with default props', () => {
  render(<BookListItem />);
  expect(screen.getByText('Unknown Bookname')).toBeInTheDocument();
  expect(screen.getByText('No description')).toBeInTheDocument();
});

test('BookListItem renders with custom props', () => {
  render(
    <BookListItem
      BookName="Test Book"
      BookDesc="Test Description"
      BookCover="https://example.com/cover.jpg"
    />
  );
  expect(screen.getByText('Test Book')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
  expect(screen.getByAltText('book cover')).toHaveAttribute('src', 'https://example.com/cover.jpg');
});

