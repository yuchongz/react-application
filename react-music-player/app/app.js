/*
* @Author: yucho
* @Date:   2018-03-24 16:59:56
* @Last Modified by:   yucho
* @Last Modified time: 2018-04-01 20:32:26
*/
import React from 'react';
import Header from './components/header/header.js';
import $ from 'jquery';
import jPlayer from 'jplayer';
import Player from './page/player-page.js';
import MusicList from './page/musicList-page.js';
import { MUSIC_LIST } from './data/data.js';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Pubsub from 'pubsub-js';

let mode = ['one', 'circulation', 'random'];
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            musicList: MUSIC_LIST,
            currentMusic: MUSIC_LIST[0]
        }
    }
    componentDidMount(){
        let _this = this;
        this.currentMode = mode[1];
        $('#player').jPlayer({
            ready: function() {
                _this.playMusic(_this.state.currentMusic);
            },
            supplied: 'mp3',
            wmode: 'window'
        });
        $('#player').bind($.jPlayer.event.ended, function(event) {
            let currentMode = _this.currentMode;
            if (currentMode === 'circulation') {
                _this.trunNextMusic('next');
            }else if (currentMode === 'one') {
                _this.playMusic(_this.state.currentMusic);
            }else {
                let index = null;
                let length = _this.state.musicList.length;
                index = Math.round(length * Math.random());
                while(_this.state.currentMusic === _this.state.musicList[index]){
                    index = Math.round(length * Math.random());
                }
                _this.playMusic('', index);
            }
        });
        Pubsub.subscribe('NEXT_MUSIC', (msg, type) => {
            this.trunNextMusic(type);
        });
        Pubsub.subscribe("DELETE_MUSIC", (msg, item) => {
            this.deleteMusic(item);
        });
        Pubsub.subscribe("CHOOSE_MUSIC", (msg, item) => {
            this.playMusic(item);
        });
        Pubsub.subscribe("CHANGE_MODE", (msg) => {
            let length = mode.length;
            let index = mode.indexOf(this.currentMode);
            index = (index + 1) % length;
            this.currentMode = mode[index];
        });
    }
    playMusic(musicItem, index) {
        let music = index? this.state.musicList[index] : musicItem;
        $('#player').jPlayer('setMedia',{
            mp3: music.file
        }).jPlayer('play');

        this.setState({
            currentMusic: music
        });
    }
    trunNextMusic(type) {
        let newIndex = null;
        let musicList = this.state.musicList;
        let index = musicList.indexOf(this.state.currentMusic);
        if (type === 'next') {
            newIndex = (index + 1) % musicList.length;
        }else {
            newIndex = (index - 1 + musicList.length) % musicList.length;
        }
        this.setState({
            currentMusic: musicList[newIndex]
        });
        this.playMusic(this.state.currentMusic);
    }
    deleteMusic(musicItem) {
        let musicArr = this.state.musicList.filter((item) => item !== musicItem);
        if (musicItem === this.state.currentMusic) {
            this.trunNextMusic('prev');
        }
        this.setState({
            musicList: musicArr
        });
    }
    componentWillUnMount() {
        $('#player').bind($.jPlayer.event.ended);
        Pubsub.unsubscribe('NEXT_MUSIC');
        Pubsub.unsubscribe("DELETE_MUSIC");
        Pubsub.unsubscribe("CHOOSE_MUSIC");
        Pubsub.unsubscribe("CHANGE_MODE");
    }
    render() {
        return (
            <HashRouter>
                <div>
                    <div id="player"></div>
                    <Header />
                    <Switch>
                        <Route exact path='/' render={() => <Player music={this.state.currentMusic} />} />
                        <Route path="/musiclist" render={() => 
                            <MusicList musicList={this.state.musicList} currentMusic={this.state.currentMusic} />} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default App;