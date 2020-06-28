import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
//import ResidencesRegistreds from './pages/ResidenceRegistreds';
import Residences from './pages/Residences';

export default function Routesx() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/detail/:id" component={Detail} />
                <Route path="/residences" component={Residences} />
            </Switch>
        </BrowserRouter>
    )
}