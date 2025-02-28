import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from '../NavBar';

const renderWithNavigation = (component) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

test('renders NavBar component correctly', () => {
  const { getByText } = renderWithNavigation(<NavBar />);
  expect(getByText('Home')).toBeTruthy();
  expect(getByText('Notes')).toBeTruthy();
  expect(getByText('Quiz')).toBeTruthy();
  expect(getByText('Help')).toBeTruthy();
});

test('navigates to Home on Home button press', () => {
  const { getByText } = renderWithNavigation(<NavBar />);
  fireEvent.press(getByText('Home'));
  // Add assertions to check navigation if needed
});

test('navigates to Notes on Notes button press', () => {
  const { getByText } = renderWithNavigation(<NavBar />);
  fireEvent.press(getByText('Notes'));
  // Add assertions to check navigation if needed
});

test('navigates to Quiz on Quiz button press', () => {
  const { getByText } = renderWithNavigation(<NavBar />);
  fireEvent.press(getByText('Quiz'));
  // Add assertions to check navigation if needed
});

test('navigates to Help on Help button press', () => {
  const { getByText } = renderWithNavigation(<NavBar />);
  fireEvent.press(getByText('Help'));
  // Add assertions to check navigation if needed
});
