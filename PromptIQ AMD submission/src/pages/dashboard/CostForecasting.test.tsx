import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CostForecasting from './CostForecasting';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe('CostForecasting', () => {
  it('renders correctly', () => {
    const { container } = render(<CostForecasting />);
    expect(screen.getByText('Cost Forecasting')).toBeInTheDocument();
    expect(screen.getByText('Estimated Annual Savings')).toBeInTheDocument();
  });
});
