import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AccountSettings from '../AccountSettings';

const renderWithNavigation = (component) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

test('renders AccountSettings page correctly', () => {
  const { getByText } = renderWithNavigation(<AccountSettings />);
  expect(getByText('Account Settings')).toBe();
  expect(getByText('My Space')).toBeTruthy();
  expect(getByText('Notes')).toBeTruthy();
  expect(getByText('Quizes')).toBeTruthy();
  expect(getByText('Settings')).toBeTruthy();
  expect(getByText('Sign Out')).toBeTruthy();
  expect(getByText('Delete Account')).toBeTruthy();
});

test('navigates to Notes on Notes button press', () => {
  const { getByText } = renderWithNavigation(<AccountSettings />);
  fireEvent.press(getByText('Notes'));
  // Add assertions to check navigation if needed
});

test('navigates to Quizes on Quizes button press', () => {
  const { getByText } = renderWithNavigation(<AccountSettings />);
  fireEvent.press(getByText('Quizes'));
  // Add assertions to check navigation if needed
});

test('signs out on Sign Out button press', () => {
  const { getByText } = renderWithNavigation(<AccountSettings />);
  fireEvent.press(getByText('Sign Out'));
  // Add assertions to check sign out if needed
});

test('deletes account on Delete Account button press', () => {
  const { getByText } = renderWithNavigation(<AccountSettings />);
  fireEvent.press(getByText('Delete Account'));
  // Add assertions to check account deletion if needed
});
