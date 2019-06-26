import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid'; //для генерации уникального id
import axios from 'axios';


class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  async componentDidMount() { //можно и не ассинхронно //получение значений поля с сервера
    const { id } = this.props.match.params;

    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    const contact = response.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })
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

    const updContact = {
      name,
      email,
      phone
    }
    const { id } = this.props.match.params;

    //AJAX-запрос  
    // можете использовать встроенный в браузер метод window.fetch или любую AJAX-библиотеку, например Axios или jQuery AJAX.
    // put запрос //update

    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);

    dispatch({ type: 'UPDATE_CONTACT', payload: response.data });

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
              <div className="card-header">Edit Contact</div>
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
                    value="Update Contact"
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
export default EditContact;