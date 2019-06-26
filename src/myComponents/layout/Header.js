import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; //встроенные валидаторы проверки



const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          {props.branding}</a>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home"></i> Home
                </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact/add" className="nav-link">
                <i className="fas fa-plus"></i> Add
                </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <i className="fas fa-question"></i> About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
// указание дефолтных пропсов//если не указано в app
Header.defaultProps = {
  branding: "default"
};

Header.propTypes = {
  branding: PropTypes.string.isRequired //валидация на соответствие jsтипу// и запрос на предупреждение, если проп не указан
};

export default Header;