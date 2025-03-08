import React from 'react';
import { render } from '@testing-library/react-native';
import SignUp from '../app/pages/SignUp';


describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders SignUp form', () => {
    const { getByText } = render(<SignUp navigation={global.mockNavigation} />);
    
    // Check if title and form fields are rendered
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Username')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByText('Confirm Password')).toBeTruthy();
  });

    // Snapshot test
    test('Sign Up snapshot test', () => {
        const { toJSON } = render(
            <SignUp navigation={global.mockNavigation} />
        );
        expect(toJSON()).toMatchSnapshot();
    });
});
