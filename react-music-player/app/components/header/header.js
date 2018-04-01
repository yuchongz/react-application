/*
* @Author: yucho
* @Date:   2018-03-23 16:42:48
* @Last Modified by:   yucho
* @Last Modified time: 2018-03-23 19:22:13
*/
import React from 'react';
import css from './header.scss';

class Header extends React.Component {
    render() {
        return (
                <div className="player-header">
                    <img src="./app/images/logo.png" alt="the logo for music player"/>
                    <span>Music Player Bulid By React</span>
                </div>
            );
    }
}

export default Header