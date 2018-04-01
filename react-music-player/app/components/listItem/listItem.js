/*
* @Author: yucho
* @Date:   2018-03-29 18:42:51
* @Last Modified by:   yucho
* @Last Modified time: 2018-04-01 00:24:49
*/
import React from 'react';
import css from './listItem.scss';
import Pubsub from 'pubsub-js';

class ListItem extends React.Component {
    controlMusicList(item, e) {
        let type = e.target.id;
        if(type === 'delete') {
            Pubsub.publish("DELETE_MUSIC", item);
        }else if (type === 'choose') {
            Pubsub.publish("CHOOSE_MUSIC", item);
        }
    }
    render() {
        let item = this.props.musicItem;
        return (
            <li id="choose" className="component-listItem" onClick={this.controlMusicList.bind(this, item)}>
                <p className={this.props.focus? 'music-info playing' : 'music-info'}>{item.title} - {item.artist}</p>
                <p id="delete" className="delete">X</p>
            </li>
        )
    }
}

export default ListItem;