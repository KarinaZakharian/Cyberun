import React, { useState } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';

const PercentageField = ({ data, handleChange, path }) => {
  const [isEmpty, setIsEmpty] = useState(!data); // Track if the field is empty or not

  const handleInputChange = (e) => {
    const value = e.target.valueAsNumber;
    handleChange(path, value);
    setIsEmpty(value === '' || isNaN(value)); // Update state based on input value
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative', 
      width: '100%',
      padding: '0', 
      borderRadius: '5px', 
      boxSizing: 'border-box' 
    }}>
      <input
        type="number"
        value={data || ''}
        onChange={handleInputChange}
        style={{ 
          padding: '16px 14px', 
          width: 'calc(100% - 30px)', 
          height: '100%',
          border: `1px solid ${isEmpty ? 'red' : '#bdbdbd'}`, 
          borderRadius: '4px',
          boxSizing: 'border-box', 
          font: 'inherit',
          letterSpacing: 'inherit',
          color: 'currentColor', 
          background: 'none', 
          margin: '0',
          display: 'block',
          outline: 'none'
        }}
      />
      <span style={{ 
        position: 'absolute', 
        right: '10px', 
        pointerEvents: 'none', 
        color: 'currentColor' 
      }}>
        %
      </span>
    </div>
  );
};

export default withJsonFormsControlProps(PercentageField);