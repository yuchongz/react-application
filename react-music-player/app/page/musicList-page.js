/*
* @Author: yucho
* @Date:   2018-03-29 18:27:35
* @Last Modified by:   yucho
* @Last Modified time: 2018-03-29 19:19:37
*/
import React from 'react';
import ListItem from '../components/listItem/listItem.js';

class MusicList extends React.Component {
    render() {
        let listEle = null;
        listEle = this.props.musicList.map((item, index) => {
            return <ListItem key={item.id} musicItem={item} focus={item === this.props.currentMusic} />
        });
        return (
            <ul>
                {listEle}
            </ul>
        )
    }
}

export default MusicList;