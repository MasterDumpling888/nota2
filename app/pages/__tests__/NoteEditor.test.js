import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import NoteEditor from '../NoteEditor';

const renderWithNavigation = (component) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

test('renders NoteEditor page correctly', () => {
  const { getByText } = renderWithNavigation(<NoteEditor />);
  expect(getByText('Note Editor')).toBeTruthy();
});
