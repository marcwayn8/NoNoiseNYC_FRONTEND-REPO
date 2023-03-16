import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewCommentModal from './NewCommentModal';

describe('NewCommentModal', () => {
  test('renders the write tab by default', () => {
    render(<NewCommentModal postId="1" />);
    const writeTab = screen.getByText('Write');
    expect(writeTab).toBeInTheDocument();
  });

  test('renders the preview tab when clicked', () => {
    render(<NewCommentModal postId="1" />);
    const previewTab = screen.getByText('Preview');
    fireEvent.click(previewTab);
    const previewContent = screen.getByText('Preview content will render here.');
    expect(previewContent).toBeInTheDocument();
  });

  test('calls createComment when submit button is clicked', () => {
    const createCommentMock = jest.fn();
    const { getByText } = render(<NewCommentModal postId="1" createComment={createCommentMock} />);
    const submitButton = getByText('Comment');
    fireEvent.click(submitButton);
    expect(createCommentMock).toHaveBeenCalled();
  });
});
