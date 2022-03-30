import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

function AppRouter({Router, initialEntries, Children}) {
  if (Router.name === 'uknown') throw new Error('Router not provided');
  if (Router.name === 'MemoryRouter') {
    return (
      <Router initialEntries={initialEntries}>
        <Children />
      </Router>
    );
  } else {
    return (
      <BrowserRouter>
        <Children />
      </BrowserRouter>
    );
  }
}

export default AppRouter;
