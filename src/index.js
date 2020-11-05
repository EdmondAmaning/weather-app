import React                            from 'react';
import ReactDOM                         from 'react-dom';
import {Route, BrowserRouter, Switch}   from 'react-router-dom';

import Home                             from './routes/home/view'
import _404                             from './routes/404/view'

import                                  'bootstrap/dist/css/bootstrap.min.css';
import                                  './assets/css/main.scss';


class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/"                                 component={Home} exact />
                    <Route component={_404} />
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));