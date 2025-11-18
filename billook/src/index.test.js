import React from 'react';

// Mock ReactDOM
const mockRender = jest.fn();
const mockCreateRoot = jest.fn(() => ({
  render: mockRender
}));

jest.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot
}));

// Mock App component
jest.mock('./App', () => {
  return function App() {
    return <div>App</div>;
  };
});

// Mock CSS import (index.css)
jest.mock('./index.css', () => ({}));

// Mock document.getElementById
const mockRootElement = {
  appendChild: jest.fn(),
  removeChild: jest.fn()
};

beforeEach(() => {
  // Reset mocks before each test
  jest.clearAllMocks();
  mockCreateRoot.mockReturnValue({
    render: mockRender
  });

  // Mock document.getElementById to return a mock root element
  document.getElementById = jest.fn((id) => {
    if (id === 'root') {
      return mockRootElement;
    }
    return null;
  });
});

test('index.js renders App in root element', () => {
  // Import index.js to execute the code
  require('./index.js');

  // Verify createRoot was called with the root element
  expect(document.getElementById).toHaveBeenCalledWith('root');
  expect(mockCreateRoot).toHaveBeenCalledWith(mockRootElement);

  // Verify render was called
  expect(mockRender).toHaveBeenCalledTimes(1);

  // Verify render was called with React.StrictMode wrapping App
  const renderCall = mockRender.mock.calls[0][0];
  expect(renderCall.type).toBe(React.StrictMode);
  expect(renderCall.props.children).toBeDefined();
});

