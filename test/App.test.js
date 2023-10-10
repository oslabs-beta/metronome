import { render, screen } from '@testing-library/react';
import App from '../test-app/src/App';

test('renders Add Animal button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Add Animal/i);
  expect(linkElement).toBeInTheDocument();
});