import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import MarkdownGuide from '../app/pages/MarkdownGuide';

// Mock components
jest.mock('../app/components/MarkdownCard', () => 'MarkdownCard');

jest.mock('../app/components/PageBox', () => {
    return function MockPageBox(props) {
        return (
            <mock-page-box testID="page-box" title={props.title} onClose={props.onClose}>
                {props.children}
            </mock-page-box>
        );
    };
});

describe('MarkdownGuide Component', () => {
    const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn()
    };
    
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('renders correct number of markdown guides', () => {
        const { UNSAFE_getAllByType } = render(<MarkdownGuide navigation={mockNavigation} />);
        const markdownCards = UNSAFE_getAllByType('MarkdownCard');
        expect(markdownCards.length).toBe(8); // There are 8 guides defined in the markdownGuides array
    });
    
    test('PageBox has correct title', () => {
        const { getByTestId } = render(<MarkdownGuide navigation={mockNavigation} />);
        const pageBox = getByTestId('page-box');
        expect(pageBox.props.title).toBe('Markdown Guide');
    });
    
    test('calls navigation.goBack when close button is pressed', () => {
        const { getByTestId } = render(<MarkdownGuide navigation={mockNavigation} />);
        const pageBox = getByTestId('page-box');
        pageBox.props.onClose();
        expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    });
    
    test('MarkdownGuide snapshot test', () => {
        const { toJSON } = render(<MarkdownGuide navigation={mockNavigation} />);
        expect(toJSON()).toMatchSnapshot();
    });
});