import './index.css'

const GameTabs = props => {
  const {tabDetails, activeTabId, clickedTabButton} = props
  const {displayText, tabId} = tabDetails
  const style = activeTabId === tabId ? 'button' : 'button1'

  const onClickTab = () => {
    clickedTabButton(tabId)
  }

  return (
    <li className="list-items">
      <button className={style} type="button" onClick={onClickTab}>
        {displayText}
      </button>
    </li>
  )
}

export default GameTabs
