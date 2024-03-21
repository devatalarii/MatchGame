import './index.css'

const GameItems = props => {
  const {imageDetails, onClickedThumbnailButton} = props
  const {imageUrl, thumbnailUrl} = imageDetails

  const onClickThumbnail = () => {
    onClickedThumbnailButton(imageUrl)
  }

  return (
    <li className="list-items">
      <button type="button" className="button2" onClick={onClickThumbnail}>
        <img className="image" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}

export default GameItems
