import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/store';

import Login from 'page/Login/index';
import App from 'page/App/index';
import Teacher from 'page/Teacher/index';
import TeacherPro from 'page/Teacher/myPro';
import Manager from 'page/Manager/index';
import Student from 'page/Student/index';
import Judge from 'page/Judge/index';
import Project from 'page/Student/Project';
import MyPro from 'page/Student/myPro.jsx';
import ViewPro from 'page/Manager/viewPro.jsx';
import Detail from 'page/Manager/detail.jsx';

const middlewareArr = [
  applyMiddleware(thunk)
  // ,
  // window['__REDUX_DEVTOOLS_EXTENSION__'] &&
  // window['__REDUX_DEVTOOLS_EXTENSION__']()
]

const store = createStore(reducer, compose(...middlewareArr));

const routers = (
  <Router>
    <App>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/student' component={Student} />
        <Route exact path='/student/new-project' component={Project} />
        <Route path='/student/edit-project/:id' component={Project} />
        <Route exact path='/student/my-project' component={MyPro} />
        <Route exact path='/teacher' component={Teacher} />
        <Route exact path='/teacher/view-project' component={TeacherPro} />
        <Route exact path='/manager' component={Manager} />
        <Route exact path='/manager/view-project' component={ViewPro} />
        <Route exact path='/manager/view-project/:id' component={Detail} />
        <Route exact path='/judges' component={Judge} />
      </Switch>
    </App>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    {routers}
  </Provider>,
  document.getElementById('root')
);