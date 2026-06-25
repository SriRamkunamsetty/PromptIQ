import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OptimizationReplay from './OptimizationReplay';

describe('OptimizationReplay', () => {
  it('renders initial stage', () => {
    render(<OptimizationReplay />);
    expect(screen.getByText('Optimization Replay Engine')).toBeInTheDocument();
    expect(screen.getAllByText('Prompt Ingestion')[0]).toBeInTheDocument();
  });
});
