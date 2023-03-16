import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import SeverityMeterComponent from './SeverityMeterComponent';

jest.mock('axios');

describe('SeverityMeterComponent', () => {
  beforeEach(() => {
    render(<SeverityMeterComponent />);
  });

  test('renders user profile image', () => {
    const userProfileImage = screen.getByAltText('User profile image');
    expect(userProfileImage).toBeInTheDocument();
  });

  test('clicking submit button adds marker to map and fetches latest complaints', async () => {
    const zipCode = '12345';
    const mockPostResponse = { data: { id: 1 } };
    const mockGetResponse = { data: [{ id: 1, title: 'Test Complaint', description: 'Test description', zipCode }] };
    axios.post.mockResolvedValue(mockPostResponse);
    axios.get.mockResolvedValue(mockGetResponse);

    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'Test Complaint' } });

    const descriptionInput = screen.getByLabelText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });

    const zipCodeInput = screen.getByLabelText('Zip Code');
    fireEvent.change(zipCodeInput, { target: { value: zipCode } });

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:4005/complaints', {
      title: 'Test Complaint',
      description: 'Test description',
      zipCode,
      severity: 'low',
      userId: undefined,
    });

    await screen.findByText('Test Complaint');

    const mapMarker = screen.getByTitle('Test Complaint');
    expect(mapMarker).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:4005/complaints');
  });
});
