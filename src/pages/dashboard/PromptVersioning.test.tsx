import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PromptVersioning from './PromptVersioning';

describe('PromptVersioning', () => {
  it('renders correctly', () => {
    render(<PromptVersioning />);
    expect(screen.getByText('Version Control')).toBeInTheDocument();
    expect(screen.getByText('Evolution Timeline')).toBeInTheDocument();
  });
});
