import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuizDetail from '../app/pages/QuizDetail';

// Mock PageBox component if needed
jest.mock('../app/components/PageBox', () => (props) => (
    <mock-page-box testID="page-box" title={props.title} onClose={props.onClose}>
        {props.children}
    </mock-page-box>
));

describe('QuizDetail Component', () => {
    // Define navigation mock
    const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn()
    };
    
    // Define mock quiz data - changing format to match component expectations
    const mockQuestions = [
        { question: 'Sample Question?', answer: 'Sample Answer' }
    ];
    
    // Define route with params
    const mockRoute = {
        params: {
            quiz: mockQuestions  // Passing array directly instead of object with questions property
        }
    };
    
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('renders QuizDetail correctly', () => {
        const { getByText } = render(
            <QuizDetail route={mockRoute} navigation={mockNavigation} />
        );
        
        expect(getByText('Question 1:')).toBeTruthy();
        expect(getByText('Sample Question?')).toBeTruthy();
    });
    
    test('navigates back when close button is pressed', () => {
        const { getByTestId } = render(
            <QuizDetail route={mockRoute} navigation={mockNavigation} />
        );
        
        // Find PageBox and trigger onClose
        const pageBox = getByTestId('page-box');
        pageBox.props.onClose();
        
        expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    });
    
    test('shows answer when "Show Answer" is pressed', () => {
        const { getByText, queryByText } = render(
            <QuizDetail route={mockRoute} navigation={mockNavigation} />
        );
        
        // Initially, answer should not be visible
        expect(queryByText('Sample Answer')).toBeNull();
        
        // Press "Show Answer" button
        fireEvent.press(getByText('Reveal Answer'));
        
        // Now answer should be visible
        expect(getByText('Sample Answer')).toBeTruthy();
    });
    
    test('QuizDetail snapshot test', () => {
        const { toJSON } = render(
            <QuizDetail route={mockRoute} navigation={mockNavigation} />
        );
        expect(toJSON()).toMatchSnapshot();
    });
});