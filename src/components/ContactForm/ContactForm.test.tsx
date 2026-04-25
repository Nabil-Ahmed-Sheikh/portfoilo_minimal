import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
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
    render(<ContactForm />);
    const form = screen.getByRole('button', { name: 'Send Message' }).closest('form')!;
    fireEvent.submit(form);
    expect(await screen.findByRole('button', { name: 'Sending...' })).toBeInTheDocument();
  });

  it('shows success state after submission resolves', async () => {
    render(<ContactForm />);
    const form = screen.getByRole('button').closest('form')!;
    fireEvent.submit(form);
    await waitFor(
      () => expect(screen.getByRole('button', { name: 'Message Sent ✓' })).toBeInTheDocument(),
      { timeout: 2000 }
    );
  });

  it('disables fields during sending', async () => {
    render(<ContactForm />);
    const form = screen.getByRole('button').closest('form')!;
    fireEvent.submit(form);
    const nameInput = screen.getByLabelText('Name');
    expect(nameInput).toBeDisabled();
  });
});
