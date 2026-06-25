import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CaseStudies from './CaseStudies';

describe('CaseStudies', () => {
  it('renders correctly', () => {
    render(<CaseStudies />);
    expect(screen.getByText('Real-world Validation')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Customer Support')).toBeInTheDocument();
  });
});
