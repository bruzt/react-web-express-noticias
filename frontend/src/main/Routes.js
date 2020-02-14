import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import HomeOrSearch from '../components/public/HomeOrSearch';
import LoginPageOrAdminPage from '../components/admin/Login/LoginPageOrAdminPage';
import NewsPage from '../components/public/content/NewsPage';

export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
                        
            <Route exact path='/' component={HomeOrSearch} />
            <Route path='/busca/:search' component={HomeOrSearch} />
            <Route path='/noticias/:id/:title' component={NewsPage} />

            <Route path='/admin' component={LoginPageOrAdminPage} />

            <Redirect from='*' to='/' />

        </Switch>
    </BrowserRouter>
  );
}
