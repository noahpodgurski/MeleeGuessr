import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const title = screen.getAllByText(/MeleeGuessr/i);
  expect(title[0]).toBeInTheDocument();
});
