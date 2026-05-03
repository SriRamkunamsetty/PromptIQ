import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SemanticFidelity from './SemanticFidelity';

describe('SemanticFidelity', () => {
  it('renders correctly', () => {
    render(<SemanticFidelity />);
    expect(screen.getByText('Semantic Fidelity Validation')).toBeInTheDocument();
    expect(screen.getByText(/Execute Semantic Validation/i)).toBeInTheDocument();
  });
});
