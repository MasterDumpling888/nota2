import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Notes from '../Notes';

const renderWithNavigation = (component) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

test('renders Notes page correctly', () => {
  const { getByText } = renderWithNavigation(<Notes />);
  expect(getByText('Notes')).toBeTruthy();
});
