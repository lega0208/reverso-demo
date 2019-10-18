import React from 'react';
import PropTypes from 'prop-types';

const languages = ['de', 'es', 'en', 'it', 'fr', 'pt'];

export default function FormSelect({ currentVal, onChange, options }) {
  return (
    <select
      className="form-control"
      defaultValue={currentVal}
      onChange={onChange}
    >
      {(options || languages).map(option => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

FormSelect.propTypes = {
  currentVal: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};
