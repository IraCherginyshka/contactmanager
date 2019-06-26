import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; //встроенные валидаторы проверки
import { Consumer } from '../../context';

import axios from 'axios';



class Contact extends Component {
  state = {
    showState: false
  };
  //можно обозначить в стрелочн ф-и в обработчике событий для привязки this
  // onDeletClick = (id, dispatch) => {
  //   // dispatch({type: 'DELETE_CONTACT', payload: id}); //для работы со своим состоянием 

  //   //AJAX-запрос  
  //   //можете использовать встроенный в браузер метод window.fetch или любую AJAX-библиотеку, например Axios или jQuery AJAX.
  //   // delete запрос

  //   axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
  //   .then(response => {
  //     dispatch({type: 'DELETE_CONTACT', payload: id})
  //   });
  //  };

  // //тоже самое в стиле async await

  onDeletClick = async (id, dispatch) => { //если стрелочная ф-я, то async ставят перед скобками
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`); //ничего не возвращ, можно не обьявлять переменную
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showState } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  onClick={() => {
                    this.setState({
                      showState:
                        !this.state.showState
                    })//переключатель true/false
                  }}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{
                    cursor: 'pointer', float: 'right',
                    color: 'red'
                  }}
                  onClick={this.onDeletClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {showState ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          )
        }}
      </Consumer>
    );
  }
}
Contact.propTypes = {
  // name: PropTypes.string.isRequired //валидация на соответствие jsтипу// и запрос на предупреждение, если проп не указан
  contact: PropTypes.object.isRequired
};

export default Contact;