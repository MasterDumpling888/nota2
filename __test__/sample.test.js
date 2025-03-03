// filepath: /Users/masterdumpling/Documents/MD Final/nota2/__tests__/HomePage.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import HomePage from '../app/pages/Homepage';

test('renders welcome message', () => {
  const { getByText } = render(<HomePage />);
  expect(getByText('Welcome to Nota 👋')).toBeTruthy();
});