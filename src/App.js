import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Contacts from './myComponents/contacts/Contacts';
import Header from './myComponents/layout/Header';
import AddContact from './myComponents/contacts/AddContact';
import EditContact from './myComponents/contacts/EditContact';
import About from './myComponents/pages/About';
import NotFound from './myComponents/pages/NotFound';
import Test from './myComponents/test/Test';

import { MyProvider } from './context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    // props.match.params.id //прлучение параметров <Route path='/roster/:id'
    // Если установлен exact prop. Совпадает только строгое сравнение 
    return (
      <MyProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path='/' component={Contacts} />
                <Route exact path='/about' component={About} />
                <Route exact path='/contact/add' component={AddContact} />
                <Route exact path='/contact/edit/:id' component={EditContact} />
                <Route exact path='/test' component={Test} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </MyProvider>
    );
  }
}

export default App;