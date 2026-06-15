import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders clinica web title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Clinica Web/i);
  expect(titleElement).toBeInTheDocument();
});
