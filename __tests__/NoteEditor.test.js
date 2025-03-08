import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import NoteEditor from '../app/pages/NoteEditor';

// Mock services specific to NoteEditor
jest.mock('../app/services/notesService', () => ({
    addNote: jest.fn(),
    getNote: jest.fn(() => Promise.resolve({
        title: 'Test Note',
        content: 'Test Content',
        folder: 'folder1',
        tag: 'tag1'
    })),
    updateNote: jest.fn(),
    fetchFolders: jest.fn(() => Promise.resolve([
        { id: 'folder1', name: 'Personal' },
        { id: 'folder2', name: 'Work' }
    ])),
    fetchTags: jest.fn(() => Promise.resolve([
        { id: 'tag1', name: 'Important' },
        { id: 'tag2', name: 'Urgent' }
    ]))
}));

jest.mock('../app/services/aiService', () => ({
    summarizeNote: jest.fn(() => Promise.resolve('This is a summarized note'))
}));

// Mock SafeAreaView
jest.mock('react-native-safe-area-context', () => ({
    SafeAreaView: 'SafeAreaView'
}));

// Mock components not already in jest.setup.js
jest.mock('../app/components/Footer', () => 'Footer');
jest.mock('../app/components/NoteNavBar', () => 'NoteNavBar');

describe('NoteEditor Component', () => {
    const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly for editing an existing note', async () => {
        const mockRoute = {
            params: {
                noteId: '123'
            }
        };

        const { getByText } = render(
            <NoteEditor route={mockRoute} navigation={mockNavigation} />
        );
    });

    test('renders correctly for creating a new note', async () => {
        const emptyRoute = { params: {} };

        const { getByPlaceholderText } = render(
            <NoteEditor route={emptyRoute} navigation={mockNavigation} />
        );

        await waitFor(() => {
            // Check for placeholder text for a new note
            expect(getByPlaceholderText('Add your title')).toBeTruthy();
            expect(getByPlaceholderText('Start typing here! (Markdown supported)')).toBeTruthy();
        });
    });

    test('NoteEditor snapshot test', () => {
        const mockRoute = {
            params: {
                noteId: '123'
            }
        };

        const { toJSON } = render(
            <NoteEditor route={mockRoute} navigation={mockNavigation} />
        );
        expect(toJSON()).toMatchSnapshot();
    });
});