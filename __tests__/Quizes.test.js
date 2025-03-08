import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Quizes from '../app/pages/Quizes';
import { fetchNotes } from '../app/services/notesService';
import { generateReviewQuestions } from '../app/services/aiService';

// Mock dependencies specific to Quizes test
jest.mock('../app/services/notesService', () => ({
    fetchNotes: jest.fn()
}));
jest.mock('../app/services/aiService', () => ({
    generateReviewQuestions: jest.fn()
}));
jest.mock('@react-navigation/native', () => ({
    useFocusEffect: jest.fn(callback => callback())
}));

// Mock Animated and PanResponder
jest.mock('react-native', () => {
    const reactNative = jest.requireActual('react-native');
    
    reactNative.Animated.Value = function(initialValue) {
        this.value = initialValue;
        this.setValue = jest.fn(newValue => { this.value = newValue; });
        this.spring = jest.fn(() => ({ start: jest.fn(cb => cb && cb()) }));
    };
    
    reactNative.Dimensions.get = jest.fn(() => ({ width: 400, height: 800 }));
    
    reactNative.PanResponder.create = jest.fn(config => ({
        panHandlers: {},
        _config: config
    }));
    
    return reactNative;
});

describe('Quizes Component', () => {

    const mockNotes = [
        { id: '1', title: 'Note 1', content: 'Content 1' },
        { id: '2', title: 'Note 2', content: 'Content 2' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        fetchNotes.mockResolvedValue(mockNotes);
        generateReviewQuestions.mockResolvedValue({ questions: [] });
    });

    test('renders correctly with notes', async () => {
        const { getByText } = render(
            <Quizes navigation={global.mockNavigation} />
        );

        // Wait for notes to load
        await waitFor(() => {
            expect(fetchNotes).toHaveBeenCalledTimes(1);
            expect(getByText('Note 1')).toBeTruthy();
            expect(getByText('Note 2')).toBeTruthy();
        });
    });

    test('renders no notes message when notes array is empty', async () => {
        fetchNotes.mockResolvedValue([]);
        
        const { getByText } = render(
            <Quizes navigation={global.mockNavigation} />
        );

        await waitFor(() => {
            expect(getByText('No notes available.')).toBeTruthy();
        });
    });

    // Snapshot test
    test('Quizes snapshot test', () => {
        const { toJSON } = render(
            <Quizes navigation={global.mockNavigation} />
        );
        expect(toJSON()).toMatchSnapshot();
    });
});