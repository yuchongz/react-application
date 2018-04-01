/*
* @Author: yucho
* @Date:   2018-03-24 00:26:07
* @Last Modified by:   yucho
* @Last Modified time: 2018-03-25 00:25:59
*/
import React from 'react';
import CSS from './progress.scss';

class Progress extends React.Component {
    changeProgress(event){
        var progress = (event.clientX - this.progressBar.getBoundingClientRect().left) 
                       / this.progressBar.clientWidth ;
        this.props.onProgressChange(progress);
    }
    render(){
        return (
            <div className="player-progress" ref={(progressBar) => { this.progressBar = progressBar; }} 
            onClick={this.changeProgress.bind(this)}>
                <div className="music-playing" style={{width: this.props.progress, 
                    background: this.props.barColor}}></div>
            </div>
        )
    }
}

Progress.defaultProps = {
    barColor: '#2f9842'
}

export default Progress;