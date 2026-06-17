import React, { useState } from 'react';

function InputForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    electricity: '',
    naturalGas: '',
    water: '',
    householdSize: '',
    heatingFuel: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (formData.electricity === '' || Number(formData.electricity) < 0) {
      newErrors.electricity = "Electricity usage must be 0 or greater.";
    }
    if (formData.naturalGas === '' || Number(formData.naturalGas) < 0) {
      newErrors.naturalGas = "Natural gas usage must be 0 or greater.";
    }
    if (formData.water === '' || Number(formData.water) < 0) {
      newErrors.water = "Water usage must be 0 or greater.";
    }
    if (formData.householdSize === '' || Number(formData.householdSize) < 1 || !Number.isInteger(Number(formData.householdSize))) {
      newErrors.householdSize = "Household size must be an integer of 1 or more.";
    }
    if (!['electric', 'gas', 'oil', 'none'].includes(formData.heatingFuel)) {
      newErrors.heatingFuel = "Please select a valid heating fuel type.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for field upon typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        electricity: Number(formData.electricity),
        naturalGas: Number(formData.naturalGas),
        water: Number(formData.water),
        householdSize: Number(formData.householdSize),
        heatingFuel: formData.heatingFuel
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form" aria-label="Carbon footprint input form">
      
      <div className="form-group">
        <label htmlFor="electricity">Monthly Electricity Usage (kWh)</label>
        <input 
          type="number" 
          id="electricity" 
          name="electricity" 
          value={formData.electricity} 
          onChange={handleChange} 
          min="0"
          step="any"
          aria-describedby={errors.electricity ? "err-electricity" : undefined}
          required
        />
        {errors.electricity && <span id="err-electricity" className="error-text" role="alert">{errors.electricity}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="naturalGas">Monthly Natural Gas Usage (therms)</label>
        <input 
          type="number" 
          id="naturalGas" 
          name="naturalGas" 
          value={formData.naturalGas} 
          onChange={handleChange} 
          min="0"
          step="any"
          aria-describedby={errors.naturalGas ? "err-naturalGas" : undefined}
          required
        />
        {errors.naturalGas && <span id="err-naturalGas" className="error-text" role="alert">{errors.naturalGas}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="water">Monthly Water Usage (liters)</label>
        <input 
          type="number" 
          id="water" 
          name="water" 
          value={formData.water} 
          onChange={handleChange} 
          min="0"
          step="any"
          aria-describedby={errors.water ? "err-water" : undefined}
          required
        />
        {errors.water && <span id="err-water" className="error-text" role="alert">{errors.water}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="householdSize">Household Size (number of people)</label>
        <input 
          type="number" 
          id="householdSize" 
          name="householdSize" 
          value={formData.householdSize} 
          onChange={handleChange} 
          min="1"
          step="1"
          aria-describedby={errors.householdSize ? "err-householdSize" : undefined}
          required
        />
        {errors.householdSize && <span id="err-householdSize" className="error-text" role="alert">{errors.householdSize}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="heatingFuel">Primary Heating Fuel Type</label>
        <select 
          id="heatingFuel" 
          name="heatingFuel" 
          value={formData.heatingFuel} 
          onChange={handleChange}
          aria-describedby={errors.heatingFuel ? "err-heatingFuel" : undefined}
          required
        >
          <option value="" disabled>Select fuel type</option>
          <option value="electric">Electric</option>
          <option value="gas">Natural Gas</option>
          <option value="oil">Oil</option>
          <option value="none">None</option>
        </select>
        {errors.heatingFuel && <span id="err-heatingFuel" className="error-text" role="alert">{errors.heatingFuel}</span>}
      </div>

      <button type="submit" disabled={isLoading} className="submit-btn">
        {isLoading ? 'Calculating...' : 'Calculate Footprint'}
      </button>

    </form>
  );
}

export default InputForm;
