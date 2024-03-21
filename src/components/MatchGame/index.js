import {Component} from 'react'
import GameTabs from '../GameTabs'
import GameItems from '../GameItems'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = this.props
    this.state = {
      activeTabId: tabsList[0].tabId,
      score: 0,
      time: 60,
      MatchedImage: imagesList[0].imageUrl,
    }
  }

  componentDidMount = () => {
    this.timerId = setInterval(this.click, 1000)
  }

  click = () => {
    const {time} = this.state
    this.setState(prevState => ({time: prevState.time - 1}))
    if (time === 1) {
      clearInterval(this.timerId)
    }
    if (time === 0) {
      clearInterval(this.timerId)
      this.setState({time: 0})
    }
  }

  getFilteredItems = () => {
    const {activeTabId} = this.state
    const {imagesList} = this.props
    const filteredList = imagesList.filter(
      eachItem => eachItem.category === activeTabId,
    )
    return filteredList
  }

  clickedTabButton = tabId => {
    this.setState({activeTabId: tabId})
  }

  onClickedThumbnailButton = imageUrl => {
    const {MatchedImage} = this.state
    const {imagesList} = this.props
    if (imageUrl === MatchedImage) {
      const randomIndex = Math.floor(Math.random() * imagesList.length)
      const randomImage = imagesList[randomIndex].imageUrl
      this.setState({MatchedImage: randomImage})
      this.setState(prevState => ({score: prevState.score + 1}))
    } else {
      this.setState({time: 0})
    }
  }

  onClickPlayAgainButton = () => {
    const {tabsList, imagesList} = this.props
    this.setState({score: 0})
    this.setState({time: 60})
    this.setState({MatchedImage: imagesList[0].imageUrl})
    this.setState({activeTabId: tabsList[0].tabId})
    this.componentDidMount()
  }

  render() {
    const {activeTabId, score, time, MatchedImage} = this.state
    const {tabsList} = this.props
    const filteredList = this.getFilteredItems()
    return (
      <div className="bg-container">
        <div className="score-time-container">
          <ul className="navbar">
            <li>
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                alt="website logo"
              />
            </li>
            <li className="score-details">
              <p className="score-styling">
                Score: <span className="count">{score}</span>
              </p>
              <img
                className="timer-image"
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
              />
              <p className="time">{time} sec</p>
            </li>
          </ul>
        </div>
        {time > 0 ? (
          <div className="images-tabs-container">
            <img className="display-image" src={MatchedImage} alt="match" />
            <ul className="tabs-list">
              {tabsList.map(eachTab => (
                <GameTabs
                  tabDetails={eachTab}
                  key={eachTab.tabId}
                  activeTabId={activeTabId}
                  clickedTabButton={this.clickedTabButton}
                />
              ))}
            </ul>
            <ul className="images-list">
              {filteredList.map(eachImage => (
                <GameItems
                  imageDetails={eachImage}
                  key={eachImage.id}
                  onClickedThumbnailButton={this.onClickedThumbnailButton}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="GameOver-container">
            <img
              className="trophy-image"
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
            />
            <p style={{color: '#ffffff'}}>YOUR SCORE</p>
            <p className="scored-gained">{score}</p>
            <button
              type="button"
              className="playAgain-button"
              onClick={this.onClickPlayAgainButton}
            >
              <img
                className="play-again-image"
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
              />
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
