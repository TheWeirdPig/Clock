import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render(){  
    return(
        <div className="wrapper">
          <Clock/>
        </div>
      );
  }
}




class Clock extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isPlay: false,
      minSessLeft: 25,
      secSessLeft: 0,
      minBreakLeft: 5,
      secBreakLeft: 0,
      breakLength: 5,
      sessionLength: 25,
      intervalId: -1,
      audioId: 'beep',
      playingSessionTimer: true
    };
  }

  setTime = () => {  
    const {isPlay, audioId, playingSessionTimer,breakLength, minBreakLeft, secBreakLeft,sessionLength, minSessLeft, secSessLeft}
    = this.state;   
    let y = document.getElementById(audioId);
    if (playingSessionTimer) {
      this.setState ({
        minSessLeft: secSessLeft == 0?
                      minSessLeft - 1:
                      minSessLeft,
        secSessLeft: minSessLeft==0&secSessLeft==0?secSessLeft:        
                      secSessLeft > 0? 
                      secSessLeft - 1:
                                 59
      })
    } else {
      this.setState ({
        minBreakLeft: secBreakLeft == 0?
                      minBreakLeft - 1:
                      minBreakLeft,
        secBreakLeft: minBreakLeft==0&secBreakLeft==0?secBreakLeft: 
                      secBreakLeft > 0? 
                      secBreakLeft - 1:
                                59
      })
    };        

    if (playingSessionTimer&&isPlay&&minSessLeft==0&&secSessLeft==0) {
      this.setState({
        playingSessionTimer: false,
        minSessLeft: sessionLength,
        secSessLeft: 0,
      });
      y.currentTime = 1;
      y.play();
    } else if (!playingSessionTimer&&isPlay&&minBreakLeft==0&&secBreakLeft==0) {
      this.setState({
        playingSessionTimer: true,
        minBreakLeft: breakLength,
        secBreakLeft: 0,
      });
      y.currentTime = 1;
      y.play();      
    }  
  };

  interval = () => {const intervalID = setInterval(this.setTime, 1000); return intervalID};

  handlePlay = () => {
    this.setState({
      isPlay: this.state.isPlay?false:true,
      intervalId: this.interval(),
    });
  }
  handlePause = () => {    
    this.setState({
      isPlay: this.state.isPlay?false:true,
      intervalId: clearInterval(this.state.intervalId)
    });
    let y = document.getElementById('beep');
    y.pause();
  }

  handleInitialize = () => {
    this.setState ({
      isPlay: false,
      minSessLeft: 25,
      secSessLeft: 0,      
      minBreakLeft: 5,
      secBreakLeft: 0,
      breakLength: 5,
      sessionLength: 25,
      intervalId: clearInterval(this.state.intervalId),
      playingSessionTimer: true
    });    
    let y = document.getElementById('beep');
    y.pause();
    y.currentTime = 0;
  }


  handleBreakDecrement = () => {
    const {isPlay, minBreakLeft, breakLength} = this.state;
    if (minBreakLeft > 1 && 
      !isPlay &&
      breakLength == minBreakLeft) {
      this.setState({
        breakLength: breakLength - 1,
        minBreakLeft: breakLength - 1,
        secBreakLeft: 0,
      })
    } else if (minBreakLeft > 1 && 
      !isPlay &&
      breakLength != minBreakLeft) {
      this.setState({
        breakLength: minBreakLeft - 1,
        minBreakLeft: minBreakLeft - 1,
        secBreakLeft: 0,
      })
    }
  }

  handleBreakIncrement = () => {
    const {isPlay, minBreakLeft, breakLength} = this.state;
    if (minBreakLeft < 60 && 
      !isPlay &&
      breakLength == minBreakLeft) {
      this.setState({
        breakLength: breakLength + 1,
        minBreakLeft: breakLength + 1,
        secBreakLeft: 0,
      })
    } else if (minBreakLeft < 60 && 
      !isPlay &&
      breakLength != minBreakLeft) {
      this.setState({
        breakLength: minBreakLeft + 1,
        minBreakLeft: minBreakLeft + 1,
        secBreakLeft: 0,
      })
    }
  }

  handleSessionDecrement = () => {
    const {isPlay, minSessLeft, sessionLength} = this.state;
    if (minSessLeft > 1 && 
      !isPlay &&
      sessionLength == minSessLeft) {
      this.setState({
        sessionLength: sessionLength - 1,
        minSessLeft: sessionLength - 1,
        secSessLeft: 0,
      })
    } else if (minSessLeft > 1 && 
      !isPlay &&
      sessionLength != minSessLeft) {
      this.setState({
        sessionLength: minSessLeft - 1,
        minSessLeft: minSessLeft - 1,
        secSessLeft: 0,
      })
    }
  }

  handleSessionIncrement = () => {
    const {isPlay, minSessLeft, sessionLength} = this.state;
    if (minSessLeft < 60 && 
      !isPlay &&
      sessionLength == minSessLeft) {
      this.setState({
        sessionLength: sessionLength + 1,
        minSessLeft: sessionLength + 1,
        secSessLeft: 0,
      })
    } else if (minSessLeft < 60 && 
      !isPlay &&
      sessionLength != minSessLeft) {
      this.setState({
        sessionLength: minSessLeft + 1,
        minSessLeft: minSessLeft + 1,
        secSessLeft: 0,
      })
    }
  }

  handleReset = () => {
    this.handleInitialize()
  }

  checkTime = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  render() {
    return (
      <div className="container"  style={{textAlign:"center"}}>     
        <div className="row">
          <div className="col col-sm-3"></div>
          <div className="col col-sm-3">
            <div id="break-label">Break length</div>
            <button id="break-decrement" onClick={this.handleBreakDecrement}>
              <i className="fas fa-arrow-circle-down" /> 
            </button>
            <div id="break-length">
              {
                this.state.breakLength
              }
            </div>
            <button id="break-increment" onClick={this.handleBreakIncrement}>
              <i className="fas fa-arrow-circle-up" /> 
            </button>
          </div>
          <div className="col col-sm-3">    
            <div id="session-label">Session length</div>        
            <button id="session-decrement" onClick={this.handleSessionDecrement}>
              <i className="fas fa-arrow-circle-down" />
            </button>
            <div id="session-length">
              {
                this.state.sessionLength
              }
            </div>
            <button id="session-increment" onClick={this.handleSessionIncrement}>
              <i className="fas fa-arrow-circle-up" /> 
            </button>
          </div>
          <div className="col col-sm-3"></div>
        </div> 
        <div className="row">
          <div className="col col-sm-4"></div>
          <div className="col col-sm-4 session-border">
            <div id="timer-label"><p style={{fontSize:"40pt"}}>
              {
                this.state.playingSessionTimer?
                  'Session'
                :
                  'Break'
              }
              </p>
              </div>
            <div id="time-left">
              {
                this.state.playingSessionTimer?
                  this.checkTime(this.state.minSessLeft) + ':' + this.checkTime(this.state.secSessLeft)
                :
                this.checkTime(this.state.minBreakLeft) + ':' + this.checkTime(this.state.secBreakLeft)
              }
            </div>
          </div>
          <div className="col col-sm-4"></div>
        </div>  
        <div className="row">
            <div className="col col-sm-12">
              {
                !this.state.isPlay?
                  <button id="start_stop" onClick={this.handlePlay}>
                    <i className="fas fa-solid fa-play"></i>
                  </button>
                :
                  <button id="start_stop" onClick={this.handlePause}>
                    <i className="fas fa-solid fa-pause"></i>
                  </button>
              }
              <button id="reset" onClick={this.handleReset}>
                <i className="fas fa-solid fa-stop"></i>
              </button> 
            </div>
        </div>             
        <audio
          id="beep"          
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

