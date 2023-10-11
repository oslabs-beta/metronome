import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {expect, test} from '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import FileUpload from '../src/components/FileUpload';

import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

test('should handle file upload', () => {
  const { getByLabelText, getByText } = render(<Router><FileUpload /></Router>);

  const file = new File(['test file content'], 'test-file.txt', { type: 'text/plain' });

  const input = getByLabelText('Choose file');
  fireEvent.change(input, { target: { files: [file] } });

  expect(getByText('test-file.txt - text/plain')).toBeInTheDocument();

  const submitButton = getByText('Upload');
  fireEvent.click(submitButton);

  expect(fetch).toHaveBeenCalledWith('/api/fileUpload', {
    method: 'POST',
    body: expect.any(global.FormData),
  });

});