import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
// const Context = React.createContext(defaultValue); //создание обьекта context// получение контекста из ближайшего Provider//в скобках - по умолчанию

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts] //формирование нового массива контактов, добавленный контакт и остальные разбитые контакты
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ? (contact = action.payload) : contact)
      };
    default:
      return state;
  }
};

export class MyProvider extends Component { //имя было Provider // глобальное хранилище//компонент Provider позволяет Consumers подписываться на изменения в Context
  state = {
    contacts: [
      // {
      //   id: 1,
      //   name: "Irka",
      //   email: "i@ua",
      //   phone: "333-333-333",
      // },
      // {
      //   id: 2,
      //   name: "Zenya",
      //   email: "i@ua",
      //   phone: "777-777-777",
      // },
      // {
      //   id: 3,
      //   name: "Artem",
      //   email: "i@ua",
      //   phone: "555-555-555",
      // }
    ],
    dispatch: action => this.setState(state => reducer(state, action))
  }

  //получение контактов с сервера (сайт для тестов) 
  //AJAX-запрос  
  //можете использовать встроенный в браузер метод window.fetch или любую AJAX-библиотеку, например Axios или jQuery AJAX.
  // get запрос

  // componentDidMount() {
  //   axios.get('https://jsonplaceholder.typicode.com/users') //возвр promise
  //     .then(response => this.setState({
  //       contacts: response.data //response.data!!!!!!!!!!!!!!!!!!!!!!!!
  //     }))
  // }

  //тоже самое в стиле async await

  async componentDidMount() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({contacts: res.data});
  }

  //Каждый объект Контекста используется вместе с Provider компонентом, который позволяет дочерним компонентам, использующим этот контекст, подписаться на его изменения.
  //{this.props.children} - Это контент между открывающим и закрывающим тегом компонента.//все что находиться между Context.Provider
  // все компоненты имеют свойство this.props.children, которое заполняется автоматически, если компонент имеет вложенные элементы. Если компонент не имеет вложенных элементов, свойство this.props.children равно null.
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
//Consumer — это React-компонент, который подписывается на изменения контекста. 
export const Consumer = Context.Consumer;