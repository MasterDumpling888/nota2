import React from 'react';
import { render } from '@testing-library/react-native';
import HomePage from '../app/pages/Homepage';

test('renders welcome message', () => {
  const { getByText } = render(<HomePage />);
  expect(getByText('Welcome to Nota 👋')).toBeTruthy();
});