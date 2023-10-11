import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarChart from '../src/components/BarChart';

describe('BarChart', () => {
  it('renders without crashing', () => {
    render(<BarChart />);
  });

  it('displays the correct text', () => {
    const { getByText } = render(<BarChart />);
    expect(getByText('Hello')).toBeInTheDocument();
  });

  // Add more tests here as needed
});