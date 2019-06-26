import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const TextInputGroup = ({ //деструктуризация или props/props.name
  name,
  label,
  placeholder,
  type,
  value,
  onChange, 
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        // первый параметр по умолчанию класс
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {/* true && expression всегда вычисляется как expression, а выражение false && expression — как false. */}
    </div>
  )
};

TextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextInputGroup.defaultProps = {
  type: 'text'
};


export default TextInputGroup;