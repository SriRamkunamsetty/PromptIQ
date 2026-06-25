import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Benchmarks from './Benchmarks';
import { ai } from '../../lib/gemini';

vi.mock('../../lib/gemini', () => ({
  ai: {
    models: {
      generateContent: vi.fn(),
    }
  }
}));

describe('Benchmarks Engine', () => {
  it('renders correctly', () => {
    render(<Benchmarks />);
    expect(screen.getByText('Live AI Benchmarking')).toBeInTheDocument();
    expect(screen.getByText('Gemini 3.1 Pro')).toBeInTheDocument();
    expect(screen.getByText('GPT-4o')).toBeInTheDocument();
  });

  it('triggers optimization test suite', async () => {
    vi.mocked(ai.models.generateContent).mockResolvedValue({
        text: 'This is a mocked model response'
    } as any);

    render(<Benchmarks />);
    const btn = screen.getByRole('button', { name: /Run Global Tests/i });
    fireEvent.click(btn);

    // Initial state loading
    expect(btn).toBeDisabled();

    // Eventually completes
    await waitFor(() => {
        expect(screen.queryAllByText('This is a mocked model response').length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });
});
