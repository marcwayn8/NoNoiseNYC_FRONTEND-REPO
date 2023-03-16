import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CommentModal from './CommentModal';

describe('CommentModal component', () => {
  test('opens modal when button is clicked', () => {
    const { getByRole } = render(<CommentModal postId={1} />);
    const button = getByRole('button');
    fireEvent.click(button);
    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
});
