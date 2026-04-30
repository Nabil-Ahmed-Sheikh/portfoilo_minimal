import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from './ContactForm';

const mockFetch = jest.fn();

beforeAll(() => {
  global.fetch = mockFetch;
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('ContactForm', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('renders the name field', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders the email field', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders the message textarea', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('shows Sending... state after submission', async () => {
    // Fetch never resolves so we stay in "sending" state
    mockFetch.mockReturnValue(new Promise(() => {}));
    render(<ContactForm />);
    const form = screen.getByRole('button', { name: 'Send Message' }).closest('form')!;
    fireEvent.submit(form);
    expect(await screen.findByRole('button', { name: 'Sending...' })).toBeInTheDocument();
  });

  it('shows success state after submission resolves', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    render(<ContactForm />);
    const form = screen.getByRole('button', { name: 'Send Message' }).closest('form')!;
    fireEvent.submit(form);
    await waitFor(
      () => expect(screen.getByRole('button', { name: 'Message Sent ✓' })).toBeInTheDocument(),
      { timeout: 3000 }
    );
  });

  it('disables fields during sending', async () => {
    mockFetch.mockReturnValue(new Promise(() => {}));
    render(<ContactForm />);
    const form = screen.getByRole('button', { name: 'Send Message' }).closest('form')!;
    fireEvent.submit(form);
    await waitFor(() => expect(screen.getByLabelText('Name')).toBeDisabled());
  });

  it('shows an error message when the request fails', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Something went wrong. Please try again.' }),
    });
    render(<ContactForm />);
    const form = screen.getByRole('button', { name: 'Send Message' }).closest('form')!;
    fireEvent.submit(form);
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });
});
