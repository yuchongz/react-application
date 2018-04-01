/*
* @Author: yucho
* @Date:   2018-03-26 14:40:32
* @Last Modified by:   yucho
* @Last Modified time: 2018-04-01 21:18:19
*/
import React from 'react';
import Progress from '../components/progress/progress.js';
import css from './player-page.scss';
import $ from 'jquery';
import jPlayer from 'jplayer';
import { Link } from 'react-router-dom';
import Pubsub from 'pubsub-js';

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            isPlaying: true,
            modePosition: -200,
            currentMode: 'circulation',
            residue: ''
        };
    }
    componentDidMount() {
        let _this = this;
        $('#player').bind($.jPlayer.event.play, function(event){
            _this.setState({
                volume: event.jPlayer.options.volume * 100 + '%'
            });
        });
        $('#player').bind($.jPlayer.event.timeupdate, function(event) {
            _this.duration = event.jPlayer.status.duration;
            //console.log(_this.duration);
            _this.setState({
                progress: event.jPlayer.status.currentPercentRelative + '%',
                residue: _this.formatTime(_this.duration * (1 - event.jPlayer.status.currentPercentAbsolute / 100))
            });
        })
        $('#player').bind($.jPlayer.event.volumechange, function(event){
            _this.setState({
                volume: event.jPlayer.options.volume * 100 + '%'
            });
        })
    }
    componentWillUnMount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
        $('#player').unbind($.jPlayer.event.volumechange);
        $('#player').unbind($.jPlayer.event.play);
    }
    formatTime(time) {
        let t = Math.floor(time);
        let minute = Math.floor(t / 60);
        let seconds = t % 60;
        minute = minute < 10 ? ('0' + minute) : minute;
        seconds = seconds < 10 ? ('0' + seconds) : seconds;
        return minute + ':' + seconds;
    }
    changeProgressHandler(progress){
        console.log(this.duration);
        $('#player').jPlayer('play', progress * this.duration);
    }
    changeVolumeHandler(progress){
        $('#player').jPlayer('volume', progress);
    }
    controlMusic(event) {
        let type = event.target.id;
        if (type === 'next' || type === 'prev') {
            Pubsub.publish('NEXT_MUSIC', type);
        }else if (type === 'isPlaying') {
            this.state.isPlaying? $('#player').jPlayer('pause') : $('#player').jPlayer('play');
            this.setState({
                isPlaying: !this.state.isPlaying
            });
        }else {
            let newModePosition = (this.state.modePosition - 40) % 280;
            newModePosition = (newModePosition == 0)? -160 : newModePosition;
            this.setState({
                modePosition: newModePosition
            });
            Pubsub.publish('CHANGE_MODE');
        }
    }
    render() {
        let music = this.props.music;
        return (
            <div className="player-container">
                <div className="music-control">
                    <div><Link to="/musiclist" className="turnList">我的私人音乐坊 ></Link></div>
                    <div className="music-name">{music.title}</div>
                    <div className="singer">{music.artist}</div>
                    <div className="time-volume">
                        <div className="time">-{this.state.residue}</div>
                        <div className="volume">
                            <img src="./app/images/icons.png" alt="control volume"/>
                            <div className="volume-progress"><Progress progress={this.state.volume}
                            onProgressChange={this.changeVolumeHandler} barColor='#888' /></div>
                        </div>
                    </div>
                    <Progress progress={this.state.progress} onProgressChange=
                    {this.changeProgressHandler.bind(this)} />
                    <div className="control" onClick={this.controlMusic.bind(this)}>
                        <img id="prev" src="./app/images/icons.png" alt="prev" />
                        <img id="isPlaying" src="./app/images/icons.png" alt="isPlaying" 
                         style={{marginTop: this.state.isPlaying? '-80px' : '-120px'}}/>
                        <img id="next" src="./app/images/icons.png" alt="next" />
                        <img id="mode" src="./app/images/icons.png"
                         alt="Adjust the mode of music" style={{marginTop: this.state.modePosition + 'px'}} />
                    </div>
                </div>
                <div className="music-cover"><img src={music.cover} alt="cover"/></div>
            </div>
        );
    }
}

export default Player;