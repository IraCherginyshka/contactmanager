import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid'; //для генерации уникального id
import axios from 'axios';


class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }
  onSubmit = async (dispatch, event) => { //async для axios.post
    event.preventDefault(); //Отмена действия по умолчанию

    const { name, email, phone } = this.state;
    if (name === '') {
      this.setState({ errors: { name: 'Name is requred' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is requred' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is requred' } });
      return;
    }
    const newContact = {
      // id: uuid(), //для post запроса не нужно
      name,
      email,
      phone
    }

    // dispatch({ type: 'ADD_CONTACT', payload: newContact }); //вызов ф-и //работа со своим состоянием

    //AJAX-запрос  
    // можете использовать встроенный в браузер метод window.fetch или любую AJAX-библиотеку, например Axios или jQuery AJAX.
    // post запрос

    // axios.post('https://jsonplaceholder.typicode.com/users', newContact) ////сайт для тестинга//возвращфет promise
    //   .then(response => dispatch({ type: 'ADD_CONTACT', payload: response.data })); //response.data!!!!!!!!!!!!!!!!!!!!!!!!

    // //тоже самое в стиле async await

    const response = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
    dispatch({ type: 'ADD_CONTACT', payload: response.data });

    this.setState({ //очистка полей
      name: '',
      email: '',
      phone: '',
      errors: {}
    })

    this.props.history.push('/');

  };

  onChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    name="name"
                    label="Name"
                    placeholder="Enter Name.."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter Email.."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    name="phone"
                    label="Phone"
                    placeholder="Enter Phone.."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )

  }
}
export default AddContact;