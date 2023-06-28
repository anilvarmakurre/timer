import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {setTime: 25, timerMin: 25, timerSec: 0, status: true, isReset: false}

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {timerMin, timerSec, status} = this.state
    if (timerMin > 0) {
      if (timerSec === 1) {
        this.setState({timerSec: 60})
      }
      this.setState(prevState => ({
        timerMin: timerSec === 1 ? prevState.timerMin - 1 : prevState.timerMin,
        timerSec:
          status === false ? prevState.timerSec - 1 : prevState.timerSec,
      }))
    } else {
      clearInterval(this.timerID)
    }
  }

  onIncrease = () => {
    const {isReset} = this.state
    if (isReset === false) {
      this.setState(prevState => ({
        setTime: prevState.setTime + 1,
        timerMin: prevState.timerMin + 1,
      }))
    }
  }

  onDecrease = () => {
    const {timerMin, isReset} = this.state
    if (timerMin > 0 && isReset === false) {
      this.setState(prevState => ({
        setTime: prevState.setTime - 1,
        timerMin: prevState.timerMin - 1,
      }))
    }
  }

  onStartPauseButton = () => {
    const {timerSec} = this.state

    this.setState(prevState => ({
      timerMin: timerSec === 0 ? prevState.timerMin - 1 : prevState.timerMin,
      timerSec: timerSec === 0 ? 59 : prevState.timerSec,
      isReset: true,
    }))
    this.setState(prevState => ({
      status: !prevState.status,
    }))
    const {status} = this.state
    console.log(status)
  }


  onResetButton = () => {
    this.setState({
      status: true,
      setTime: 25,
      timerMin: 25,
      timerSec: 0,
      isReset: true,
    })
    clearInterval(this.timerID)
  }

  render() {
    const {setTime, status, timerMin, timerSec} = this.state

    const num = 0

    const getPlatPauseText = status === true ? 'Start' : 'Pause'

    const playPause = status ? 'play icon' : 'pause icon'

    const playOrPause = status ? 'Paused' : 'Running'

    const startOrPauseImageUrl = status
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    return (
      <div className="bg-container">
        <h1 className="head">Digital Timer</h1>
        <div className="inner-container">
          <div className="left-container">
            <div className="timer-box">
              <div className="timer-container">
                <h1 className="timer">
                  {timerMin > 9 ? timerMin : `${num}${timerMin}`}:
                  {timerSec > 9 ? timerSec : `${num}${timerSec}`}
                </h1>
                <p className="timer-para">{playOrPause}</p>
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="right-top">
              <div className="right-top-left">
                <button
                  className="timer-button"
                  id="timer1"
                  type="button"
                  onClick={this.onStartPauseButton}
                >
                  <img
                    className="timer-image"
                    src={startOrPauseImageUrl}
                    alt={playPause}
                  />
                </button>

                <label htmlFor="timer1" className="play-pause">
                  {getPlatPauseText}
                </label>
              </div>
              <div className="right-top-right">
                <button
                  className="timer-button"
                  id="timer2"
                  type="button"
                  onClick={this.onResetButton}
                >
                  <img
                    className="timer-image"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>

                <label htmlFor="timer2" className="play-pause">
                  Reset
                </label>
              </div>
            </div>
            <div className="right-bottom">
              <p className="right-bottom-para">Set The Timer</p>
              <div className="right-bottom-bottom">
                <button
                  className="min-button"
                  type="button"
                  onClick={this.onDecrease}
                >
                  -
                </button>
                <p className="timer-clock">{setTime}</p>
                <button
                  className="max-button"
                  type="button"
                  onClick={this.onIncrease}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
