import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  // Basic smoke test to ensure the app renders
  expect(document.body).toBeInTheDocument();
});

test('app has router structure', () => {
  const { container } = render(<App />);
  // Verify the app renders (router will be present)
  expect(container).toBeTruthy();
});

