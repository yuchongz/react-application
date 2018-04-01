/*
* @Author: yucho
* @Date:   2018-03-30 21:37:21
* @Last Modified by:   yucho
* @Last Modified time: 2018-03-30 23:23:00
*/
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './app.js';
import Player from './page/player-page.js';
import MusicList from './page/musicList-page.js';

class Root extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path="/" component={App} />
                    <Switch>
                        <Route path='/' component={Player} />
                        <Route path="musiclist" component={MusicList} />
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default Root;