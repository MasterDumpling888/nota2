import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomePage from '../app/pages/Homepage';

test('renders HomePage correctly', async () => {
    const { getByText } = render(<HomePage />);
  
    await waitFor(() => {
        expect(getByText('Welcome to Nota 👋')).toBeTruthy();
    });
});

// test snapshot of Homepage
test('HomePage snapshot test', async () => {
    const { toJSON } = render(<HomePage />);
    await waitFor(() => {
        expect(toJSON()).toMatchSnapshot();
    });
});