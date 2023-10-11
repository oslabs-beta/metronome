import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../src/components/Dashboard';
import BarChart from '../src/components/BarChart';
import OverviewChart from '../src/components/OverviewChart';
import PieChart from '../src/components/PieChart';

xdescribe('Dashboard', () => {
  xit('renders without crashing', () => {
    render(<Dashboard />);
  });

  xit('renders BarChart component', () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId('bar-chart')).toBeInTheDocument();
  });

  xit('renders OverviewChart component', () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId('overview-chart')).toBeInTheDocument();
  });

  xit('renders PieChart component', () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId('pie-chart')).toBeInTheDocument();
  });
});