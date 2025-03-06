import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../app/pages/Login';

test('renders Email input', () => {
    const { getByText } = render(<Login navigation={global.mockNavigation} />);
    expect(getByText('Email')).toBeTruthy();
});

test('Login snapshot test', () => {
    const { toJSON } = render(<Login navigation={global.mockNavigation} />);
    expect(toJSON()).toMatchSnapshot();
});