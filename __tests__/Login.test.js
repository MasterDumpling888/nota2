import React from 'react';
import { render } from '@testing-library/react-native';
import Login from '../app/pages/Login';

describe('Login Component', () => {
    const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn()
    };
    
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('renders Login screen title', () => {
        const { getByText } = render(<Login navigation={mockNavigation} />);
        expect(getByText('Login')).toBeTruthy(); // Checking title
    });
    
    test('renders Email input', () => {
        const { getByText } = render(<Login navigation={mockNavigation} />);
        expect(getByText('Email')).toBeTruthy();
    });
    
    test('renders Password input', () => {
        const { getByText } = render(<Login navigation={mockNavigation} />);
        expect(getByText('Password')).toBeTruthy();
    });
    
    test('renders Login button', () => {
        const { getByText } = render(<Login navigation={mockNavigation} />);
        expect(getByText('Login', { selector: 'button' })).toBeTruthy();
    });
    
    test('Login snapshot test', () => {
        const { toJSON } = render(<Login navigation={mockNavigation} />);
        expect(toJSON()).toMatchSnapshot();
    });
});