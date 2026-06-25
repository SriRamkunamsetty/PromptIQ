import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RuntimeObservability from './RuntimeObservability';

describe('RuntimeObservability', () => {
  it('renders correctly', () => {
    render(<RuntimeObservability />);
    expect(screen.getByText('Runtime Observability')).toBeInTheDocument();
    expect(screen.getByText('Live Telemetry Stream')).toBeInTheDocument();
  });
});
