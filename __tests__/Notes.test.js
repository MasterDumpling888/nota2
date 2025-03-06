import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Notes from '../app/pages/Notes';
import { fetchNotes, fetchFolders, fetchTags, addFolder, addTag } from '../app/services/notesService';

// Mock dependencies
jest.mock('../app/services/notesService', () => ({
    fetchNotes: jest.fn(),
    fetchFolders: jest.fn(),
    fetchTags: jest.fn(),
    addFolder: jest.fn(),
    addTag: jest.fn(),
}));

describe('Notes Component', () => {
    const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn()
    };
    
    beforeEach(() => {
        jest.clearAllMocks();
        
        // Mock data
        fetchNotes.mockResolvedValue([
            { id: '1', title: 'Test Note 1', summary: 'Summary 1', folder: '1', tag: '1' },
            { id: '2', title: 'Test Note 2', summary: 'Summary 2', folder: '2', tag: '2' },
        ]);
        
        fetchFolders.mockResolvedValue([
            { id: '1', name: 'Folder 1' },
            { id: '2', name: 'Folder 2' },
        ]);
        
        fetchTags.mockResolvedValue([
            { id: '1', name: 'Tag 1' },
            { id: '2', name: 'Tag 2' },
        ]);
    });

    test('fetches data on component mount', async () => {
        render(<Notes navigation={global.mockNavigation} />);
        
        await waitFor(() => {
            expect(fetchNotes).toHaveBeenCalledTimes(1);
            expect(fetchFolders).toHaveBeenCalledTimes(1);
            expect(fetchTags).toHaveBeenCalledTimes(1);
        });
    });

    test('renders display mode buttons correctly', () => {
        const { getByText } = render(<Notes navigation={global.mockNavigation} />);
        expect(getByText('Notes')).toBeTruthy();
        expect(getByText('Folders')).toBeTruthy();
        expect(getByText('Tags')).toBeTruthy();
    });
    
    test('switches between display modes', async () => {
        const { getByText } = render(<Notes navigation={global.mockNavigation} />);
        
        // Initially in notes mode
        fireEvent.press(getByText('Folders'));
        // Now in folders mode
        
        fireEvent.press(getByText('Tags'));
        // Now in tags mode
        
        fireEvent.press(getByText('Notes'));
        // Back to notes mode
    });
    
    test('navigates to note editor when a note is pressed', async () => {
        const { findByText } = render(<Notes navigation={global.mockNavigation} />);
        
        // Wait for notes to be rendered
        const noteTitle = await findByText('Test Note 1');
        fireEvent.press(noteTitle);
        
        expect(global.mockNavigation.navigate).toHaveBeenCalledWith('NoteEditor', { noteId: '1' });
    });

    // Snapshot testing
    test('Notes snapshot test', () => {
        const { toJSON } = render(<Notes navigation={global.mockNavigation} />);
        expect(toJSON()).toMatchSnapshot();
    });
});
