import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AccessibilityDashboard from './AccessibilityDashboard';

describe('AccessibilityDashboard', () => {
  it('renders the core metrics', () => {
    render(<AccessibilityDashboard />);
    expect(screen.getByText('Accessibility Center')).toBeInTheDocument();
    expect(screen.getByText('WCAG 2.1 AA Compliant')).toBeInTheDocument();
  });

  it('renders progress areas', () => {
    render(<AccessibilityDashboard />);
    expect(screen.getByText('Keyboard Navigation')).toBeInTheDocument();
    expect(screen.getByText('Screen Reader Coverage')).toBeInTheDocument();
    expect(screen.getByText('Color Contrast')).toBeInTheDocument();
  });
});
