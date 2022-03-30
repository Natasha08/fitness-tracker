import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

function AppRouter({Router, initialEntries, Children}) {
  if (Router.name === 'uknown') throw new Error('Router not provided');
  if (Router.name === 'BrowserRouter') {
    return (
      <BrowserRouter>
        <Children />
      </BrowserRouter>
    );
  } else {
    return (
      <Router initialEntries={initialEntries}>
        <Children />
      </Router>
    );
  }
}

export default AppRouter;
