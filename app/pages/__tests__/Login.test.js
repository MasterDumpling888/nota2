import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Login';

const renderWithNavigation = (component) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

test('renders Login page correctly', () => {
  const { getByText } = renderWithNavigation(<Login />);
  expect(getByText('Login')).toBeTruthy();
});

test('navigates to SignUp on Sign Up button press', () => {
  const { getByText } = renderWithNavigation(<Login />);
  fireEvent.press(getByText('Sign Up'));
  // Add assertions to check navigation if needed
});
