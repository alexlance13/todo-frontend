import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CreateNewTodo from './pages/CreateNewTodo';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/create-new-todo' component={CreateNewTodo} />
        <Redirect to='/' />
      </Switch>
    </>
  );
}

export default App;
