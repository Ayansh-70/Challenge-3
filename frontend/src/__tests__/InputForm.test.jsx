import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputForm from '../components/InputForm';

describe('InputForm Component', () => {
  it('renders all fields and labels', () => {
    render(<InputForm onSubmit={() => {}} isLoading={false} />);
    
    expect(screen.getByLabelText(/Monthly Electricity Usage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Monthly Natural Gas Usage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Monthly Water Usage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Household Size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Primary Heating Fuel Type/i)).toBeInTheDocument();
  });

  it('validates required fields before submitting', () => {
    const mockSubmit = vi.fn();
    render(<InputForm onSubmit={mockSubmit} isLoading={false} />);
    
    // Fire submit with empty form (HTML5 validation would catch it, but our custom validation also triggers if we bypass it)
    fireEvent.click(screen.getByRole('button', { name: /Calculate Footprint/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    // HTML5 `required` prevents our manual submit in real browser, but in jsdom we can check if it stays.
  });

  it('calls onSubmit with correct numeric types', () => {
    const mockSubmit = vi.fn();
    render(<InputForm onSubmit={mockSubmit} isLoading={false} />);
    
    fireEvent.change(screen.getByLabelText(/Monthly Electricity Usage/i), { target: { value: '150' } });
    fireEvent.change(screen.getByLabelText(/Monthly Natural Gas Usage/i), { target: { value: '45' } });
    fireEvent.change(screen.getByLabelText(/Monthly Water Usage/i), { target: { value: '3000' } });
    fireEvent.change(screen.getByLabelText(/Household Size/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/Primary Heating Fuel Type/i), { target: { value: 'gas' } });

    fireEvent.submit(screen.getByRole('form'));

    expect(mockSubmit).toHaveBeenCalledWith({
      electricity: 150,
      naturalGas: 45,
      water: 3000,
      householdSize: 4,
      heatingFuel: 'gas'
    });
  });
});
