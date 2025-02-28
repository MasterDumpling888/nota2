import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MarkdownGuide from '../MarkdownGuide';

const renderWithNavigation = (component) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

test('renders MarkdownGuide correctly', () => {
  const { getByText } = renderWithNavigation(<MarkdownGuide />);
  expect(getByText('Markdown Guide')).toBeTruthy();
});
