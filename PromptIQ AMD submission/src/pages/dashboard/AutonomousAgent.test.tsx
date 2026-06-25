import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AutonomousAgent from './AutonomousAgent';

vi.mock('../../lib/gemini', () => ({
  ai: {
    models: {
      generateContent: vi.fn(),
    }
  }
}));

describe('AutonomousAgent', () => {
  it('renders correctly', () => {
    render(<AutonomousAgent />);
    expect(screen.getByText('Autonomous Optimization Agent')).toBeInTheDocument();
    expect(screen.getByText('Auto-Optimize')).toBeInTheDocument();
  });
});
