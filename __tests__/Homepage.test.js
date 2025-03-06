import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomePage from '../app/pages/Homepage';

describe('HomePage Component', () => {
    const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders unauthenticated view correctly', () => {
        const { getByText } = render(<HomePage navigation={mockNavigation} />);
        
        // Check welcome message
        expect(getByText('Welcome to Nota 👋')).toBeTruthy();
        
        // Check buttons
        expect(getByText('Join Nota')).toBeTruthy();
        expect(getByText('What is Markdown?')).toBeTruthy();
    });

    test('navigates to SignUp when Join Nota is pressed', () => {
        const { getByText } = render(<HomePage navigation={mockNavigation} />);
        const joinButton = getByText('Join Nota');
        
        fireEvent.press(joinButton);
        
        expect(mockNavigation.navigate).toHaveBeenCalledWith('SignUp');
    });

    test('navigates to MarkdownGuide when What is Markdown is pressed', () => {
        const { getByText } = render(<HomePage navigation={mockNavigation} />);
        const markdownButton = getByText('What is Markdown?');
        
        fireEvent.press(markdownButton);
        
        expect(mockNavigation.navigate).toHaveBeenCalledWith('MarkdownGuide');
    });

    test('HomePage snapshot test', () => {
        const { toJSON } = render(<HomePage navigation={mockNavigation} />);
        expect(toJSON()).toMatchSnapshot();
    });
});