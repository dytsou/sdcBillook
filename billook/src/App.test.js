import { render } from '@testing-library/react';
import React from 'react';

// Basic smoke test to ensure the testing environment is set up correctly
test('testing environment is configured', () => {
  const TestComponent = () => <div>Test</div>;
  const { container } = render(<TestComponent />);
  expect(container).toBeTruthy();
});

test('React is working', () => {
  expect(React).toBeDefined();
});

test('renders simple component', () => {
  const TestComponent = () => <h1>Hello World</h1>;
  const { getByText } = render(<TestComponent />);
  expect(getByText('Hello World')).toBeInTheDocument();
});

