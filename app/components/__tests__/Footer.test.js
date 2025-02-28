import React from 'react';
import { render } from '@testing-library/react-native';
import Footer from '../Footer';

test('renders Footer component correctly', () => {
  const { getByText } = render(<Footer />);
  expect(getByText('© 2023 Your Company')).toBeTruthy();
});
