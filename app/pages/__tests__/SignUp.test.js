import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from '../SignUp';

const renderWithNavigation = (component) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

test('renders SignUp page correctly', () => {
  const { getByText } = renderWithNavigation(<SignUp />);
  expect(getByText('Sign Up')).toBeTruthy();
});

test('navigates to Login on Login button press', () => {
  const { getByText } = renderWithNavigation(<SignUp />);
  fireEvent.press(getByText('Login'));
  // Add assertions to check navigation if needed
});
