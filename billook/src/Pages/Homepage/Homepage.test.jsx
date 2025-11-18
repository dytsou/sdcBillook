import React from 'react';
import { render } from '@testing-library/react';
import Homepage from './Homepage';
import AuthContext from '../../Store/AuthContent';

// Mock CreateBook component
jest.mock('./CreateBook', () => {
  return function CreateBook() {
    return <div data-testid="create-book">CreateBook</div>;
  };
});

// Mock image assets
jest.mock('../../Assets/homepg_img.jpg', () => 'homepg_img.jpg');
jest.mock('../../Assets/left_quotation_mark.png', () => 'left_quotation_mark.png');
jest.mock('../../Assets/right_quotation_mark.png', () => 'right_quotation_mark.png');

test('Homepage renders when user is not logged in', () => {
  const mockAuth = {
    isLoggedIn: false,
    token: null,
    userId: null,
    login: jest.fn(),
    logout: jest.fn()
  };

  const { queryByTestId } = render(
    <AuthContext.Provider value={mockAuth}>
      <Homepage />
    </AuthContext.Provider>
  );

  expect(queryByTestId('create-book')).not.toBeInTheDocument();
});

test('Homepage renders CreateBook when user is logged in', () => {
  const mockAuth = {
    isLoggedIn: true,
    token: 'test-token',
    userId: 'test-user-id',
    login: jest.fn(),
    logout: jest.fn()
  };

  const { getByTestId } = render(
    <AuthContext.Provider value={mockAuth}>
      <Homepage />
    </AuthContext.Provider>
  );

  expect(getByTestId('create-book')).toBeInTheDocument();
});

