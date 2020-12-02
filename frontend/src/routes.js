import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import ServicoDisponivel from './pages/ServicoDisponivel';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/homepage" component={HomePage} />
                <Route path="/servicoDisponivel/new" component={ServicoDisponivel} />
            </Switch>
        </BrowserRouter>
    );
}