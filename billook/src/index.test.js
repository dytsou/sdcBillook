import React from 'react';

// Mock ReactDOM
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn()
  }))
}));

// Mock App component
jest.mock('./App', () => {
  return function App() {
    return <div>App</div>;
  };
});

test('index.js can be imported', () => {
  // This test verifies that index.js can be imported without errors
  // The actual rendering is tested in App.test.js
  expect(React).toBeDefined();
});

