import React from 'react';
import { render } from '@testing-library/react-native';
import Footer from '../app/components/Footer';

test('renders Footer correctly', () => {
  const { getByText } = render(<Footer />);
  expect(getByText('© 2025 Nota. All rights reserved.')).toBeTruthy();
});
