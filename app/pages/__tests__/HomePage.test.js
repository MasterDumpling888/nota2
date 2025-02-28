import React from 'react';
import { render } from '@testing-library/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../Homepage';

const renderWithNavigation = (component) => {
  return render(<SafeAreaView>
    <NavigationContainer>{component}</NavigationContainer>
  </SafeAreaView>);
};

test('renders HomePage correctly', () => {
  const { getByText } = renderWithNavigation(<HomePage />);
  expect(getByText('Welcome to HomePage')).toBeTruthy();
});
