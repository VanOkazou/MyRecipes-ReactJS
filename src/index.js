// REACT
import React from 'react';
import { render } from 'react-dom';

// COMPONENTS
import App from './components/App';
import Connexion from './components/Connexion';
import NotFound from './components/NotFound';

// ROOTER
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// CSS
import './index.css';

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Connexion } />
      <Route exact path="/recipes/:pseudo" component={ App } />
      <Route component={ NotFound } />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
