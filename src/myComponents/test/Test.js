import React, { Component } from 'react'

class Test extends Component {
  state = {
    title: '',
    body: ''
  }

  //AJAX-запрос  
  //можете использовать встроенный в браузер метод window.fetch или любую AJAX-библиотеку, например Axios или jQuery AJAX.
  
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/1') //сайт для тестинга//возвращфет promise
      .then(response => response.json())
      .then(data => this.setState({
        title: data.title,
        body: data.body
      }));
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {

  // }

  // UNSAFE_componentWillMount() {

  // }

  // UNSAFE_componentWillUpdate() {

  // }

  // UNSAFE_componentWillReceiveProps() {

  // }

  // static getDerivedStateFromProps(props, state) {

  //   return null;
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {

  // }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    )
  }
}
export default Test;