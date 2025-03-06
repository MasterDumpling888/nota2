import React from 'react';
import { render } from '@testing-library/react-native';
import QuizDetail from '../app/pages/QuizDetail';

const mockRoute = {
  params: {
    quiz: [{ question: 'Sample Question?', answer: 'Sample Answer' }]
  }
};

test('renders QuizDetail correctly', () => {
  const { getByText } = render(<QuizDetail route={mockRoute} navigation={global.mockNavigation} />);
  
  expect(getByText('Question 1:')).toBeTruthy();
  expect(getByText('Sample Question?')).toBeTruthy();
});

test('QuizDetail snapshot test', () => {
  const { toJSON } = render(<QuizDetail route={mockRoute} navigation={global.mockNavigation} />);
  expect(toJSON()).toMatchSnapshot();
});