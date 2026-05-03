import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SemanticCache from './SemanticCache';

describe('SemanticCache', () => {
  it('renders correctly', () => {
    render(<SemanticCache />);
    expect(screen.getByText('Semantic Cache Engine')).toBeInTheDocument();
    expect(screen.getByText('Cache Hit Rate')).toBeInTheDocument();
  });
});
