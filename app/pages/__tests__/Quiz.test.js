import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Quiz from '../Quiz';

const renderWithNavigation = (component) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

test('renders Quiz page correctly', () => {
  const { getByText } = renderWithNavigation(<Quiz />);
  expect(getByText('Quiz')).toBeTruthy();
});
