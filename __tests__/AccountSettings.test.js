import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AccountSettings from '../app/pages/AccountSettings';

describe('AccountSettings Component', () => {
    const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn()
    };
    
    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test('renders Sign Out button', () => {
        const { getByText } = render(<AccountSettings navigation={mockNavigation} />);
        expect(getByText('Sign Out')).toBeTruthy(); // Checking Sign Out button
    });
    
    test('renders Delete Account button', () => {
        const { getByText } = render(<AccountSettings navigation={mockNavigation} />);
        expect(getByText('Delete Account')).toBeTruthy(); // Checking Delete Account button
    });
    
    test('AccountSettings snapshot test', () => {
        const { toJSON } = render(<AccountSettings navigation={mockNavigation} />);
        expect(toJSON()).toMatchSnapshot();
    });
});