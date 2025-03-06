import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import MarkdownGuide from '../app/pages/MarkdownGuide';


// Mock navigation
const mockNavigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
};

// Mock PageBox component
jest.mock('../app/components/PageBox', () => (props) => (
    <mock-PageBox>{props.children}</mock-PageBox>
));

// Mock MarkdownCard component
jest.mock('../app/components/MarkdownCard', () => (props) => (
    <mock-MarkdownCard>{props.title}</mock-MarkdownCard>
));


test('MarkdownGuide snapshot test', () => {
    const { toJSON } = render(<MarkdownGuide navigation={mockNavigation} />);
    expect(toJSON()).toMatchSnapshot();
});