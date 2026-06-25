import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import * as authStore from './lib/store';

// Mock dependencies
vi.mock('./lib/store', () => ({
  useAuthStore: vi.fn(),
}));

describe('App Routing', () => {
  it('renders landing page for unauthenticated users', () => {
    // Mock state where user is not loaded and not signed in
    vi.mocked(authStore.useAuthStore).mockReturnValue({
      user: null,
      isLoading: false,
      setUser: vi.fn(),
      setLoading: vi.fn()
    });

    render(<App />);
    expect(screen.getByText(/Start Optimizing Free/i)).toBeInTheDocument();
  });
});
