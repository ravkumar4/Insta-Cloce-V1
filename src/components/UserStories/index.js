import './index.css'

const UserStories = props => {
  const {story} = props
  const {userName, storyUrl} = story
  return (
    <li className="story-container">
      <img alt="user story" className="story-image" src={storyUrl} />
      <p className="story-user-name">{userName}</p>
    </li>
  )
}

export default UserStories
